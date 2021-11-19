import { Dialog, DialogTitle, DialogContent, Grid, Button, LinearProgress } from '@material-ui/core/';
import TextField from 'components/Shared/Fields/Text';
import { useFormikObservable } from 'hooks/useFormikObservable';
import IOrder from 'interfaces/models/order';
import * as yup from 'yup';
import orderService from 'services/order';
import { tap } from 'rxjs/operators';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';

import React, { useCallback } from 'react';

interface IFormDialogProps {
  open: boolean;
  onRequestClose: () => void;
  onComplete: (user: IOrder) => void;
  onCancel: () => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().required().min(3).max(50),
  description: yup.string().required().min(3).max(50),
  quantity: yup.number().required(),
  amount: yup.number().required()
});

const FormDialog: React.FC<IFormDialogProps> = ({ open, onRequestClose, onComplete }) => {
  const formik = useFormikObservable<IOrder>({
    // initialValues: { roles: [] },
    validationSchema,
    onSubmit(model) {
      return orderService.save(model).pipe(
        tap(order => {
          Toast.show('Pedido Criado');
          onComplete(order);
        }),
        logError(true)
      );
    }
  });

  const handleExit = useCallback(() => {
    formik.resetForm();
    onRequestClose();
  }, [formik]);

  return (
    <Dialog open={open} onBackdropClick={onRequestClose} onExited={handleExit}>
      {formik.isSubmitting && <LinearProgress color='primary' />}

      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Criar Pedido</DialogTitle>
        <DialogContent>
          <Grid>
            <TextField label='Título' name='title' formik={formik} />
          </Grid>
          <Grid>
            <TextField label='Descrição' name='description' formik={formik} />
          </Grid>
          <Grid>
            <TextField label='Quantidade' name='quantity' formik={formik} />
          </Grid>
          <Grid>
            <TextField label='Valor' name='amount' formik={formik} />
          </Grid>
          <Grid>
            <Button fullWidth variant='outlined' onClick={handleExit}>
              Cancelar
            </Button>
            <Button fullWidth variant='contained' color='primary' type='submit' disabled={formik.isSubmitting}>
              Salvar
            </Button>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default FormDialog;
