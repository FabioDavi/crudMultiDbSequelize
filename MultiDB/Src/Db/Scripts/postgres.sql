
DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROIS 
(NOME, PODER)
VALUES
('Super Man','Power'),
('Batman','Dinheiro'),
('Aquamen','Falar com os animais'),
('Flash','Velocidade')