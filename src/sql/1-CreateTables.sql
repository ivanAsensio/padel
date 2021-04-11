-- Indexes for primary keys have been explicitly created.

DROP TABLE User;
DROP TABLE Field;
DROP TABLE Schedule;
DROP TABLE Game;
DROP TABLE GameUser;

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    login VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    name VARCHAR(60) NOT NULL,
    lastName1 VARCHAR(60) NOT NULL, 
    lastName2 VARCHAR(60) NOT NULL, 
    phone VARCHAR(60) NOT NULL, 
    role TINYINT NOT NULL,
    state TINYINT NOT NULL,
    level INT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT LoginUniqueKey UNIQUE (login)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByLogin ON User (login);

CREATE TABLE Field(
	fieldId BIGINT NOT NULL AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
    state TINYINT NOT NULL,
	CONSTRAINT FieldPK PRIMARY KEY (fieldId)
) ENGINE = InnoDB;

CREATE TABLE Schedule(
    scheduleDay TINYINT NOT NULL,
	initHour VARCHAR(60) NOT NULL, 
    finalHour VARCHAR(60) NOT NULL, 
    userId BIGINT NOT NULL,
	CONSTRAINT SchedulePK PRIMARY KEY (scheduleDay, initHour, finalHour, userId),
    CONSTRAINT ScheduleUserIdFK FOREIGN KEY(userId)
    	REFERENCES User(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE Game(
	gameId BIGINT NOT NULL AUTO_INCREMENT,
	gameDate DATETIME NOT NULL,
    level INT NOT NULL,
    fieldId BIGINT NOT NULL,
	CONSTRAINT GamePK PRIMARY KEY (gameId),
    CONSTRAINT GameFieldIdFK FOREIGN KEY(fieldId)
    	REFERENCES Field(fieldId) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE GameUser(
    gameId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    CONSTRAINT GameUserPK PRIMARY KEY (gameId, userId),
    CONSTRAINT GameUserUserIdFK FOREIGN KEY(userId)
    	REFERENCES User(id) ON DELETE CASCADE,
    CONSTRAINT GameUserGameIdFK FOREIGN KEY(gameId)
    	REFERENCES Game(gameId) ON DELETE CASCADE
)
