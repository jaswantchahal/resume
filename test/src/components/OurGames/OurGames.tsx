import React, { useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { useSelector } from 'react-redux';
import "./OurGames.scss";
import { selectGameState } from "../../context/games/gamesSlice";
import useGames from "../../hooks/useGames";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface Game  {
  url_thumb: 'string',
  game_name: 'string',
  game_status: 'string',
}

const OurGamesComponent: React.FC = () => {
  const { getGames } = useGames();
  const { games, gamesStatus } = useSelector(selectGameState);
  const { t } = useTranslation();

  useEffect(() => {
    if(gamesStatus === "idle") {
      getGames();
    }
  }, [gamesStatus, getGames]);

  return (
    <div style={{ padding: "0 16px" }}>
      <Text
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: 500,
          paddingTop: 20,
          paddingBottom: 16,
        }}
      >
        <span className="ic" style={{ paddingRight: "10px", lineHeight: 0 }}>
          <img src="./images/star_ic.svg" alt="" />
        </span>{" "}
        {t('Our Games')}
      </Text>
      <div className="games_list">
        <Row gutter={16}>
          {games?.map((game: Game, index: number) => (
            <Col span={12} key={index}>
              <div
                className="game_card"
                style={{
                  textAlign: "center",
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                <img
                  src={game.url_thumb}
                  alt={game.game_name}
                  style={{ width: "100%", height: "185px", objectFit: 'cover', borderRadius: "8px", background: 'var(--primary-color)' }}
                />
                <div className="overlay">
                  <Text
                    style={{
                      display: "block",
                      fontSize: 18,
                      fontWeight: 800,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {game.game_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {game.game_status}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default OurGamesComponent;
