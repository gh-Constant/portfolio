-- D'abord, créer les tables et insérer les données initiales
DROP TABLE IF EXISTS Journal;
DROP TABLE IF EXISTS Spectacle;
DROP TABLE IF EXISTS Client;

-- Création de la table Client
CREATE TABLE Client (
    id_client INTEGER NOT NULL,
    nom VARCHAR(30) NOT NULL,
    nb_places_reservees INTEGER NOT NULL,
    solde INTEGER NOT NULL,
    PRIMARY KEY (id_client)
);

-- Création de la table Spectacle
CREATE TABLE Spectacle (
    id_spectacle INTEGER NOT NULL,
    titre VARCHAR(30) NOT NULL,
    nb_places_offertes INTEGER NOT NULL CHECK(nb_places_offertes>=0),
    nb_places_libres INTEGER NOT NULL CHECK(nb_places_libres>=0),
    tarif DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_spectacle)
);

-- Création de la table Journal
CREATE TABLE Journal (
    id INTEGER AUTO_INCREMENT,
    libelle_transaction VARCHAR(30) NOT NULL,
    client_id INTEGER,
    nb_places INTEGER,
    spectacle_id INTEGER,
    tarif DECIMAL(19,4),
    PRIMARY KEY (id)
);

-- Insertion des données initiales
INSERT INTO Client VALUES (1, 'Philippe', 0, 2000);
INSERT INTO Client VALUES (2, 'Julie', 0, 350);

INSERT INTO Spectacle VALUES (1, 'Ben hur', 250, 50, 50);
INSERT INTO Spectacle VALUES (2, 'Tartuffe', 120, 30, 30);

COMMIT;

-- Ensuite, dans un nouveau fichier ou après, faire la transaction
SET @nb_place=20;
SET @spectacle_id=1;
SET @client_id=1;

SET autocommit = 0;
START TRANSACTION;

SELECT @nb_place,@spectacle_id,@client_id;



-- Ici viendront vos requêtes de transaction

SELECT * FROM Spectacle;
SELECT * FROM Client;
SELECT * FROM Journal;

COMMIT;

SELECT * FROM Spectacle;
SELECT * FROM Client;
SELECT * FROM Journal;