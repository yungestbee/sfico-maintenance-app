import React, { useState, useEffect } from 'react';
import './adminEngineerPage.css';
// import './EngrPage.css';
import { FaTrash, FaXmark, FaPen } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from 'react-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import AdminLoginPage from './adminLogin';
import AdminHeader from './adminHeader';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import DateTimeDisplay from '../DateTimeDisplay.jsx';
// import logo from '../users/img/footer-logo.png';

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  phoneNumber: z.string().min(11),
  email: z.string().min(2),
  address: z.string().min(2),
});

const AdminEngrPage = () => {
  const [admin, setAdmin] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [error, setError] = useState('');
  const [cError, setcError] = useState('');
  const token = Cookies.get('userToken');
  const [decode, setDecode] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const user = decoded.user.name.split('.');
      setDecode(user);
    }
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await fetch('http://localhost:2300/api/v1/engineer', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.message);
      } else {
        setError('Failed to fetch data from the database');
        console.error('Failed to fetch data from the database');
      }
    } catch (error) {
      setError(error.response.data.msg);
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    // Simulated API endpoint for fetching data from the database

    fetchAdmin();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedItem('');
    setModalOpen(false);
  };
  const openModal2 = (id) => {
    setSelectedId(id);
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setSelectedId('');
    setModalOpen2(false);
  };

  const errorTimer = (e) => {
    setcError(e);
    setTimeout(() => {
      setcError('');
    }, 2000);
  };

  const handleAddEngineer = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:2300/api/v1/signup',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        // Registration successful, show success message or redirect to another page
        // reset();
        console.log(response);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAdmin();
      } else {
        // Registration failed, handle error response from the server
        const data = response.json();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // alert(data.restaurant.error); // Display the error message sent by the server
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle other errors (e.g., network error)
      // alert(error.response);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An error occurred during process. Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleDelete = async (Id) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/engineer/${Id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // Refetch the updated list of foods
        setSelectedId('');
        closeModal2();
        fetchAdmin();
      } else {
        console.error('Failed to delete data from the database');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong, Please try again later',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEdit = async (data) => {
    console.log(data);
    // Implement the logic to edit a food item (e.g., redirect to an edit page)
    try {
      // Simulate API request using fetch or Axios
      const response = await axios.put(
        `http://localhost:2300/api/v1/engineer/${selectedItem._id}`,
        data,
        { withCredentials: true }
      );

      if (response.status == 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Data successfully updated in the database',
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedItem('');
        closeModal();
        // Refetch the updated list of foods
        fetchAdmin();
      } else {
        setError('Something went wrong, Please try again later');
        console.error('Failed to upload data to the database');
        // Additional logic or feedback for failure
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: true,
        timer: 1500,
      });
      console.error('Error:', error);
    }
  };

  return (
    <>
      {decode != '' && decode == 'admin' ? (
        <div className="restaurant-page-container">
          <section className="section-admin-hero">
            <AdminHeader />
            <img className="hero-img" src="sfico-logo.png" alt="hero-img" />
            <h1 className="heading-primary">Admin</h1>
          </section>
          {/* THE FORM SECTION */}
          <section className="form-section">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <div className="form-section-container">
              <div className="form-description">
                <h3 className="heading-tertiary">Staff Management</h3>
                <p>
                  Effectively manage reports with the management module. As an
                  Engineer, you can add new reports and track previous reports.
                  The system also includes features for filtering log by date
                  and company name. →
                </p>
              </div>
              <div className="form-container">
                <fieldset>
                  <legend className="legend">Staff Manager</legend>
                  <form onSubmit={handleSubmit(handleAddEngineer)}>
                    <ul className="form-list">
                      <li className="form-list-item">
                        <label>First Name:</label>
                        <input type="text" {...register('firstName')} />
                      </li>
                      <li className="form-list-item">
                        <label>Last Name:</label>
                        <input type="text" {...register('lastName')} />
                      </li>
                      <li className="form-list-item">
                        <label>Email:</label>
                        <input type="email" {...register('email')} />
                      </li>
                      <li className="form-list-item">
                        <label>Address:</label>
                        <input type="text" {...register('address')} />
                      </li>
                      <li className="form-list-item">
                        <label>Phone Number:</label>
                        <input type="number" {...register('phoneNumber')} />
                      </li>
                    </ul>
                    {cError && <p className="delivery-error">{cError}</p>}
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="addAdmin-btn"
                      // className="addAdmin-btn"
                    >
                      {isValid ? <>Submit</> : <s>Submit</s>}
                    </button>
                  </form>
                </fieldset>
              </div>
            </div>
          </section>
          <section className="section-dishes">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
            </svg>
            <h2>Engineers</h2>
            {/* {error && <p className="error">{error}</p>} */}
            {admin.length > 0 ? (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Engineer's Name</th>
                      <th>Engineer's Address</th>
                      <th>Engineer's Tel.</th>
                      <th>Engineer's Email</th>
                      <th>Date Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.map((e) => (
                      <tr key={e._id}>
                        <td>
                          {`${e.firstName} 
                          ${e.lastName}`}
                        </td>
                        <td>{e.address}</td>
                        <td>{e.phoneNumber}</td>
                        <td>{e.email}</td>
                        <td>
                          <DateTimeDisplay timestamp={e.createdAt} />
                        </td>
                        <td>
                          <div className="click-order2">
                            <FaPen
                              className="click-order2-icon"
                              onClick={() => openModal(e)}
                            ></FaPen>
                            <FaTrash
                              className="click-order2-icon"
                              onClick={() => openModal2(e._id)}
                            ></FaTrash>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="modal-container">
                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="modal"
                  >
                    <FaXmark
                      className="modal-icon"
                      onClick={() => setModalOpen(false)}
                    />
                    <h3>Edit Product</h3>
                    <form
                      onSubmit={handleSubmit(handleEdit)}
                      className="modal-form"
                    >
                      <input
                        className="modal-input"
                        type="text"
                        value={`${selectedItem.firstName} ${selectedItem.lastName}`}
                        readOnly
                      />
                      <br />
                      <input
                        className="modal-input"
                        type="text"
                        value={selectedItem.address}
                        placeholder="Address"
                      />
                      <br />
                      <input
                        className="modal-input"
                        type="number"
                        value={selectedItem.phoneNumber}
                        placeholder="Phone Number"
                      />
                      <br />
                      <input
                        className="modal-input"
                        type="email"
                        value={selectedItem.email}
                        placeholder="Email"
                      />
                      {error && <p className="error">{error}</p>}

                      <div className="btn-chamber">
                        <button
                          disabled={!isValid}
                          className={
                            isValid ? 'modal-button cnfm' : 'modal-button cnfm2'
                          }
                          type="submit"
                        >
                          Confirm
                        </button>
                        <button
                          className="modal-button"
                          onClick={() => setModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
                <div className="modal-container">
                  <Modal
                    isOpen={modalOpen2}
                    onRequestClose={closeModal2}
                    className="modal2"
                  >
                    <FaXmark
                      className="modal-icon"
                      onClick={() => setModalOpen2(false)}
                    />
                    <h3>Delete Profile</h3>
                    <p>Are you sure you want to delete this Profile ?</p>

                    <div className="btn-chamber2">
                      <button
                        className="modal-button cnfm"
                        type="submit"
                        onClick={() => handleDelete(selectedId)}
                      >
                        Confirm
                      </button>
                      <button
                        className="modal-button"
                        onClick={() => setModalOpen2(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            ) : (
              <p className="delivery-error">No data available</p>
            )}
          </section>
        </div>
      ) : (
        <AdminLoginPage />
      )}
      <footer className="general-footer">
        <div>&copy; Yungest Concepts</div>
        <div className="footer-logo-box">
          {/* <img className="footer-logo" src={logo} alt="logo" /> */}
        </div>
      </footer>
    </>
  );
};

export default AdminEngrPage;
