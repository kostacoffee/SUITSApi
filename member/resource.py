from auth import auth_required

from flask_apispec import marshal_with, doc
from flask_apispec.views import MethodResource

from .model import Model
from .schema import Schema

@doc(tags=['Members'])
class Member(MethodResource):

    @doc(
        summary="Retrieve a member",
        description="""Retrieves a member with a given ID.
        Unlike its list counterpart, this endpoint will also 
        return references to all events attended by this member."""
    )
    @auth_required
    @marshal_with(Schema)
    def get(self, id):
        return Model.query.get_or_404(id)

    @doc(
        summary="Modify a particular member",
        description="""Modifies a member record with a given id with
        the data in the request body."""
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema)
    def put(self, id, **att_data):
        att = Model.query.get_or_404(id)

        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        return att


