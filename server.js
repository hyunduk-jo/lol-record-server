import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.post('/api/summoner', async (req, res) => {
  const { summonerName } = req.body;
  //console.log(encodeURI(summonerName))
  try {
    const result = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}?api_key=${process.env.RIOT_API_KEY}`);
    if (result.status === 200) {
      res.json(result.data);
    } else if (result.status === 404) {
      res.json("Not Found");
    }
  } catch (e) {
    console.log(e.message);
    res.json(404)
  }
})

app.post('/api/league', async (req, res) => {
  const { summonerId } = req.body;
  //console.log(summonerId);
  try {
    const result = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURI(summonerId)}?api_key=${process.env.RIOT_API_KEY}`);
    res.json(result.data);
  } catch (e) {
    console.log(e.message);
  }
})

app.post('/api/matches', async (req, res) => {
  const { accountId } = req.body;
  //console.log(accountId);
  try {
    const result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${process.env.RIOT_API_KEY}`);
    res.json(result.data);
  } catch (e) {
    console.log(e.message);
  }
})

app.post('/api/match', async (req, res) => {
  const { gameId } = req.body;
  //console.log(gameId)
  try {
    const result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${process.env.RIOT_API_KEY}`);
    res.send(result.data);
  } catch (e) {
    console.log(e.message)
  }
})

app.listen(PORT, () => console.log(`🚀 Express Server Running on http://localhost:${PORT}`));