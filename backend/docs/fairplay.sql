 
BEGIN;

DROP TABLE IF EXISTS "user_has_activity", "user_has_sport", "user", "activity", "sport", "message", "user_place", "user_grade", "activity_statut", "activity_place";

CREATE TABLE "sport" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity_place" (
    "id" SERIAL PRIMARY KEY,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT DEFAULT '',
    "zip_code" TEXT DEFAULT '',
    "department" TEXT DEFAULT '',
    "region" TEXT DEFAULT '',
    "google_place_key" TEXT DEFAULT '',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "private" BOOLEAN DEFAULT 'false',
    "indoor" BOOLEAN DEFAULT 'false',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_grade" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "point" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_place" (
    "id" SERIAL PRIMARY KEY,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "zip_code" TEXT NOT NULL DEFAULT '',
    "department" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "google_place_key" TEXT NOT NULL DEFAULT '',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL DEFAULT '',
    "pseudo" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "lastname" TEXT NOT NULL DEFAULT '',
    "firstname" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT NOT NULL DEFAULT '',
    "reward_count" INTEGER NOT NULL DEFAULT 0,
    "admin" BOOLEAN DEFAULT 'false',
    "user_grade_id" INTEGER NOT NULL REFERENCES user_grade("id"),
    "user_place_id" INTEGER NOT NULL REFERENCES user_place("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity_statut" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "illustration" TEXT DEFAULT '',
    "date" DATE,
    "time" TIME,
    "duration" TIME DEFAULT '01:00',
    "participant_count" INTEGER DEFAULT 0,
    "min_participant" INTEGER DEFAULT 0,
    "creator_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "activity_place_id" INTEGER NOT NULL REFERENCES activity_place("id"),
    "activity_status_id" INTEGER NOT NULL REFERENCES activity_statut("id"),
    "sport_id" INTEGER NOT NULL REFERENCES sport("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY,
    "comment" TEXT NOT NULL DEFAULT '',
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "activity_id" INTEGER NOT NULL REFERENCES activity("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_sport" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"), 
  "sport_id" INTEGER NOT NULL REFERENCES sport("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_has_activity" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
  "activity_id" INTEGER NOT NULL REFERENCES activity("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "sport" ("name", "icon") VALUES
('foot', 'foot'),
('tennis', 'tennis'),
('randonnee', 'randonnee'),
('yoga', 'yoga'),
('velo', 'velo'),
('footing', 'footing'),
('escalade', 'escalade'),
('basketball', 'basketball'),
('fitness', 'fitness');


INSERT INTO "activity_place" ("address", "city", "zip_code", "department", "region", "google_place_key", "lat", "lng", "private", "indoor") VALUES
('38 Rue René Alazard', 'Bagnolet', '93170', 'Seine-Saint-Denis', 'Ile-de-France', '', 48.87370931491529, 2.4195904982846748, true, true), 
('10 Place de la Comédie', 'Montpellier', '34000', 'Hérault', 'Occitanie','', 43.609406065437526, 3.879749211605195, false, false),
('Promenade du Peyrou', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.61125, 3.8707581, true, true),
('Antigone', 'Montpellier', '34000', 'Hérault', 'Occitanie','', 43.60656218226759, 3.897884664180845, false, false),
('Jardin des Plantes de Montpellier', 'Montpellier', '34000', 'Hérault', 'Occitanie','', 43.614916733296106, 3.8717026293668932, false, false),
('Jardin des Plantes de Montpellier', 'Montpellier', '34000', 'Hérault', 'Occitanie','', 43.614916733296106, 3.8717026293668932, false, false),
('Promenade du Peyrou', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.61125, 3.8707581, false, false),
('ALTISSIMO Montpellier Odysseum', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.603459, 3.91822, false, false),
('Montpellier Basket Mosson Avenue de Naples', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.614719, 3.864104, false, false),
('Corum', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 40.491419, 34.611076, false, false),
('Tennis municipal Pérols', 'Lattes', '34970', 'Hérault', 'Occitanie', '', 43.55998, 3.934869, false, false),
('Tennis Club Grabels', 'Grabels', '34116', 'Hérault', 'Occitanie', '', 43.650149, 3.788602, false, false),
('Decathlon Montpellier Saint Jean De Vedas', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.604932, 3.924178, false, false),
('Montpellier Hérault Sport Club', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.616826, 3.92947, false, false),
('Stade de la Mosson', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.62237, 3.811944, false, false),
('Montpellier athletic sport', 'Montpellier', '34080', 'Hérault', 'Occitanie', '', 43.614719, 3.864104, false, false),
('Aniane', 'Aniane', '34150', 'Hérault', 'Occitanie', '', 43.683914, 3.586115, false, false),
('Camping Club Lac du Salagou', 'Clermont-l''Hérault', '34800', 'Hérault', 'Occitanie', '', 43.646626, 3.393238, false, false),
('Parc du Levant', 'Palavas-les-Flots', '34250', 'Hérault', 'Occitanie', '', 43.52945, 3.928986, false, false),
('Skatepark de Saint-Jean de Védas', 'Saint-Jean-de-Védas', '34430', 'Hérault', 'Occitanie', '', 43.577761, 3.825309, false, false),
('Bloc Session Nîmes', 'Nîmes', '30900', 'Hérault', 'Occitanie', '', 43.817104, 4.350128, false, false),
('Fitness Park Vendargues', 'Vendargues', '34740', 'Hérault', 'Occitanie', '', 43.652084, 3.959956, false, false),
('Salle de sports Isadora Duncan', 'Montpellier', '34070', 'Hérault', 'Occitanie', '', 43.622339, 3.841971, false, false),
('Figuerolles', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.606091, 3.861769, false, false);

INSERT INTO "user_grade" ("name", "point") VALUES
('Novice', 0),
('Nice follower', 100),
('Perfect partner', 200),
('Just addict', 500),
('Leader', 5000);

INSERT INTO "user_place" ("address", "city", "zip_code", "department", "region", "google_place_key", "lat", "lng") VALUES
('25 Rue Gabriel Marie', 'Marseille', '13010','Provence-Alpes-Côte d''Azur', 'Bouches-du-Rhône', '', 43.28572709923827, 5.401447882759161),
('2-38 Rue des Pervenches', 'Montpellier', '34000', 'Hérault', 'Occitanie', '', 43.599436353996595, 3.8843637994919),
('38 Rue René Alazard', 'Bagnolet', '93170', 'Seine-Saint-Denis', 'Ile-de-France', '', 48.87370931491529, 2.4195904982846748), 
('10 Place de la Comédie', 'Montpellier', '34000', 'Hérault', 'Occitanie','', 43.609406065437526, 3.879749211605195);

INSERT INTO "user" ("email", "pseudo", "password", "firstname", "lastname", "avatar", "reward_count", "admin", "user_grade_id", "user_place_id") VALUES
('benj@gmail.com', 'Benjamin', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Benjamin', 'Russo', '', 10, false, 1, 1),
('clo@gmail.com', 'Clotilde', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Clotilde', 'Fauchille', '', 20, true, 4, 2),
('jerem@hotmail.fr', 'Jeremy', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Jeremy', 'Mairey', '', 200, true, 2, 3),
('couderc.boris@gmail.com', 'Boris', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Boris', 'Couderc', '', 0, false, 3, 3);

INSERT INTO "activity_statut" ("name")
VALUES ('passed'), ('canceled'), ('ongoing');

INSERT INTO "activity" ("title", "description", "illustration", "date", "time", "duration", "participant_count", "min_participant", "creator_id", "activity_place_id", "activity_status_id", "sport_id")
VALUES ('Escalade en salle', 'Qui est motivé pour une fin d''aprèm bloc ? Je peux prêter du matos !', '', '08/20/2021', '18:30', '2:00', 1, 3, 2, 8, 3, 7),
('Basketball', 'Des motivés pour basketball ? ça peut être sympa à partir de 2 contre 2.', '', '05/29/2021', '11:30', '1:00', 3, 4, 2, 9, 3, 8),
('Footing', 'Un petit footing de bon matin ? Avec un rythme un peu soutenu autour de 5:00, je m''entraine pour un semi :)', '', '08/16/2021', '07:30', '1:00', 1, 2, 2, 10, 3, 6),
('Petit tennis', 'Des motivés pour un tennis ? niveau vraiment amateur !', '', '07/06/2021', '14:30', '1:00', 1, 2, 3, 12, 1, 2),
('Initiation yoga', 'Un petit rendez-vous initiation yoga, ça vous dit ? même novices curieux bienvenues !', '', '06/23/2021', '16:30', '1:00', 2, 4, 3, 10, 3, 4),
('Randonnee dans la Gardiole', 'Des motivés pour une demi journée rando ? Point de rendez-vous à Saint Jean De Vedas, à Decathlon.', '', '06/17/2021', '10:00', '4:30', 2, 2, 3, 13, 3, 3), 
('Foot énervé', 'Partie de foot au stade des Guillants, mettez votre plus beau maillot', '', '06/10/2021', '18:00', '2:30', 2, 8, 3, 14, 1, 1), 
('Double tennis', 'On est chaud du revers', '', '07/06/2021', '14:30', '1:00', 1, 4, 1, 12, 1, 2),
('Petite partie de foot', 'Au stade Maurice, mettez votre plus beau maillot !', '', '07/02/2021', '18:00', '2:30', 2, 8, 1, 15, 3, 1), 
('Un bon tennis', 'Tennis en terre battue', '', '07/01/2021', '18:30', '1:00', 3, 4, 1, 11, 3, 2),
('Tennis', 'Ca va smasher', '', '07/06/2021', '9:30', '1:00', 1, 2, 1, 11, 3, 2),
('foot', 'Foot afterwork, ça vous dit ?', '', '06/22/2021', '19:00', '2:30', 2, 8, 3, 16, 3, 1), 
('Vélo', 'Sortie en velo tout terrain', '', '07/26/2021', '14:30', '1:00', 1, 2, 3, 17, 3, 5),
('Tour du lac du Salagou', 'Rando près du lac du Salagou', '', '07/07/2021', '10:00', '4:30', 2, 2, 4, 18, 3, 3), 
('Yoga', 'Initiation au yoga', '', '06/08/2021', '14:30', '1:00', 1, 4, 4, 19, 3, 4),
('Footing tranquille', 'Footing au cannal saint-Martin', '', '07/07/2021', '17:30', '1:00', 1, 2, 4, 20, 3, 6),
('Escalade bloc', 'Escalade de Bloc, rendez vous à Bloc Session Nîmes !', '', '07/30/2021', '11:30', '1:00', 1, 3, 4, 21, 3, 7),
('Basketball', 'Un bon basketball improvisé ? des motivés !?', '', '05/20/2021', '11:30', '1:00', 1, 3, 4, 2, 3, 8),
('Fitness', 'Fitness en salle à Fitness Park Vendargues, on se crée un programme à plusieurs ?', '', '06/15/2021', '7:30', '1:00', 1, 3, 4, 22, 3, 9),
('Footing en fin d''aprèm ?', 'Un bon footing avec un rythme un peu soutenu autour de 5:00, je m''entraine pour un semi :)', '', '05/28/2021', '17:30', '1:00', 1, 2, 2, 5, 3, 6),
('Fitness et cross-fit', 'Des motivés pour une session cross-fit vers ma La Croix d''Argent', '', '06/02/2021', '7:30', '1:00', 1, 3, 4, 23, 3, 9),
('Footing dans l''aprèm ?', 'Un bon footing avec un rythme sympa ?', '', '06/28/2021', '14:30', '1:00', 1, 2, 2, 24, 3, 6);


INSERT INTO "message" ("comment", "user_id", "activity_id")
VALUES ('Attend de voir mon jeu ^^', 2, 2),
('Vous voulez vous retrouver vers quelle heure ?', 2, 2);

INSERT INTO "user_has_sport" ("user_id", "sport_id")
VALUES (1, 3), (1, 4), (2, 1), (3, 2);

INSERT INTO "user_has_activity" ("user_id", "activity_id") VALUES
(1, 1), (1, 2), (2, 2), (3, 2);

COMMIT;