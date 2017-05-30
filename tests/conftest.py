from app import app
from db import db
import pytest

@pytest.fixture
def client():
    #TODO DB setup code
    db.create_all()
    yield app.test_client()

    #TODO Teardown code
    db.drop_all()

@pytest.fixture
def full_memb():
    return {
        "first_name": "John",
        "last_name": "Smith",
        "sid": 450543509,
        "access": 1509342,
        "newsletter": True,
        "doing_it": True,
        "registered": True
    }

@pytest.fixture
def unreg_memb():
    return {
        "first_name": "unregistered",
        "last_name": "member",
        "access": 1678208
    }

@pytest.fixture
def event1():
    return {
        "title": "Best event1",
        "description": "doot!"
    }


@pytest.fixture
def event2():
    return {
        "title": "Better than best event",
        "description": "You tell'em!"
    }