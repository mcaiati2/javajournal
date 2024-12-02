import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import ReactStars from 'react-rating-stars-component';


import { GET_USER_SHOPS } from '../../graphql/queries';
import { Shop } from '../../interfaces';

import CreateCoffeeModal from './components/CreateCoffeeModal';
import ViewCoffeeModal from './components/ViewCoffeeModal';

function Dashboard() {
  const { data: shopData } = useQuery(GET_USER_SHOPS);

  const [selectedShop, setSelectedShop] = useState<null | Shop>(null);
  const [showCreateCoffeeModal, setShowCreateCoffeeModal] = useState(false);
  const [showCoffeesModal, setShowCoffeesModal] = useState(false);


  const handleShowCreateCoffeeModal = (shop: Shop) => {
    setSelectedShop(shop);

    setShowCreateCoffeeModal(true);
  };

  const handleShowCoffeesModal = (shop: Shop) => {
    setSelectedShop(shop);

    setShowCoffeesModal(true);
  };

  return (
    <Container>
      <h3 className="mt-4 fw-light">Your Shops</h3>
      <hr />

      {/* need to set shop output */}
      <section className="d-grid gap-4 shop-output">
        {shopData && !shopData.getUserShops.length && <p>No shops have beed added yet.</p>}

        {shopData && shopData.getUserShops.map((shop: Shop) => (
          <article key={shop._id} className="border p-4">
            <h4>{shop.name}</h4>
            <p>Location: {shop.location}</p>
            <ReactStars
              count={5}
              value={shop.rating}
              // onChange={handleRatingChange}
              size={24}
              activeColor="#FFD700"
            />

            <div className="d-flex button-wrap">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => handleShowCreateCoffeeModal(shop)}>Add Coffee</Button>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => handleShowCoffeesModal(shop)}>View Coffee</Button>
            </div>
          </article>
        ))}
      </section>

      <CreateCoffeeModal
        selectedShop={selectedShop}
        showCreateCoffeeModal={showCreateCoffeeModal}
        setShowCreateCoffeeModal={setShowCreateCoffeeModal}
      />

      <ViewCoffeeModal
        showCoffeesModal={showCoffeesModal}
        setShowCoffeesModal={setShowCoffeesModal}
        selectedShop={selectedShop}
      />

    </Container>
  )
}

export default Dashboard;