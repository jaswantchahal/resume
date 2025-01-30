import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../context/store'; // Update paths to your store types
import { getUserThunk } from '../context/user/userThunk';
import { selectUserState } from '../context/user/userSlice';

interface GetUserParams {
  loader?: boolean;
}

const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector(selectUserState);

  const getUser = (params?: GetUserParams) => {
    const { loader } = params || {};
    dispatch(getUserThunk({ refetch: false, loader, modalLoader: false }));
  };

  return {
    getUser,
    userInfo,
  };
};

export default useUser;
