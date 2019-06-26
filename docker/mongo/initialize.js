db.createUser(
    {
      user: "db_user",
      pwd: "db_password_123123!!..",
      roles: [
         { role: "dbOwner", db: "triafy" }
      ]
    }
,
    {
        w: "majority",
        wtimeout: 5000
    }
);