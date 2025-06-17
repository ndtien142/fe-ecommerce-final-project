import { useSnackbar } from 'notistack';
import { IShowMessage, MessageType } from '../@types/message.interface';

export default function useShowSnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  function showSuccessSnackbar(message: string, config?: IShowMessage) {
    enqueueSnackbar(message, {
      variant: MessageType.SUCCESS,
      ...config,
    });
  }
  function showErrorSnackbar(message: string, config?: IShowMessage) {
    enqueueSnackbar(message, {
      variant: MessageType.ERROR,
      ...config,
    });
  }
  return { showSuccessSnackbar, showErrorSnackbar };
}
