import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../context/store';
import { getGamesThunk } from '../context/games/gamesThunk';

interface GetGamesParams {
  loader?: boolean;
}

const useGames = () => {
  const dispatch: AppDispatch = useDispatch();

  const getGames = (params?: GetGamesParams) => {
    const { loader } = params || {};
    dispatch(getGamesThunk({ refetch: false, loader, modalLoader: false }));
  };

  return {
    getGames,
  };
};

export default useGames;
