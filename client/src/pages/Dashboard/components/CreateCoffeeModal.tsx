import { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { CREATE_COFFEE } from '../../../graphql/mutations';
import { GET_COFFEES_FOR_SHOP, GET_ALL_COFFEES } from '../../../graphql/queries';
import { Shop } from '../../../interfaces';

const initialFormData = {
  title: '',
  body: '',
  flavor: '',
  errorMessage: ''
};

interface ModalProps {
  selectedShop: Shop | null;
  showCreateCoffeeModal: boolean;
  setShowCreateCoffeeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateCoffeeModal({
  selectedShop,
  showCreateCoffeeModal,
  setShowCreateCoffeeModal
}: ModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [createCoffee] = useMutation(CREATE_COFFEE, {
    refetchQueries: [{
      query: GET_COFFEES_FOR_SHOP,
      variables: {
        shopId: selectedShop?._id
      }
    }, { query: GET_ALL_COFFEES }]
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleModalClose = () => {
    setFormData({ ...initialFormData });
    setShowCreateCoffeeModal(false);
    setSuccessMessage(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await createCoffee({
        variables: {
          ...formData,
          shop: selectedShop?._id
        }
      });

      setFormData({ ...initialFormData });
      setSuccessMessage("Coffee logged! Add another?");
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  };

  return (
    <div>
      <Modal show={showCreateCoffeeModal} onHide={handleModalClose} >
        <Modal.Header>
          <Modal.Title>New Coffee:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {formData.errorMessage && <Alert variant="danger">{formData.errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                type="text"
                placeholder="Enter the name of your coffee"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter your comments for the coffee</Form.Label>
              <Form.Control
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                as="textarea"
                rows={3}
                placeholder="Type your details"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Flavor</Form.Label>
              <Form.Control
                name="flavor"
                value={formData.flavor}
                type="text"
                placeholder="Enter the flavor of your coffee"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel-btn" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className="add-btn" onClick={handleSubmit}>
            Add Coffee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCoffeeModal;