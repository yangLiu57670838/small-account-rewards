CREATE ROLE testuser WITH LOGIN PASSWORD '12345';
CREATE DATABASE test_database;
GRANT ALL PRIVILEGES ON DATABASE test_database TO testuser;
ALTER ROLE testuser superuser;

CREATE TABLE register_user (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    create_on timestamp NOT NULL,
    update_on timestamp,
    rewards integer
);







