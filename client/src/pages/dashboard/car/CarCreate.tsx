import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from '_redux/store';
import { getCars } from '_redux/slices/car';
import { PATH_DASHBOARD } from 'routes/paths';
import { ProductState } from '@types/cars';
import Page from 'components/common/Page';
import HeaderBreadcrumbs from 'components/common/HeaderBreadcrumbs';
import CarNewForm from 'components/_dashboard/car/CarNewForm';

// ----------------------------------------------------------------------

export default function CarCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { cars } = useSelector((state: { car: ProductState }) => state.car);
  const isEdit = pathname.includes('edit');
  const currentCar = cars.find((car) => paramCase(car.name) === name);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <Page title="Create a new car | Evs rental cms">
      <Container>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new car' : 'Edit car'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Car',
              href: PATH_DASHBOARD.car.root
            },
            { name: !isEdit ? 'New car' : name }
          ]}
        />

        <CarNewForm isEdit={isEdit} currentCar={currentCar} />
      </Container>
    </Page>
  );
}
