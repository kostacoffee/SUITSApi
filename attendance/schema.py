from app import ma

class Schema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    primary = ma.Bool()
    secondary = ma.Bool()
    additional = ma.Str()

    member = ma.Nested('member.schema.Schema', only=('id', 'ref'), dump_only=True)

    event = ma.Nested('event.schema.Schema', only=('id', 'ref'), dump_only=True)

    ref = ma.URLFor('attendance', id='<id>')
