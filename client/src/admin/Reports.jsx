import React, { useState, useEffect } from 'react';
import { FaTrash, FaXmark } from 'react-icons/fa6';
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
  name: z.string().min(2),
  location: z.string().min(2),
});

const ReportPage = () => {
  const [admin, setAdmin] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState('');
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
      const response = await fetch('http://localhost:2300/api/v1/reports', {
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

  const handleAddReport = async (e) => {
    e.preventDefault();
    if (name == '' || location == '' || image == '') {
      errorTimer('Please fill all input fields');
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('file', image);
      const data = Object.fromEntries(formData);

      try {
        const response = await axios.post(
          'http://localhost:2300/api/v1/reports/createReport',
          data,
          {
            withCredentials: true,
          }
        );

        if (response.status == 200) {
          // Registration successful, show success message or redirect to another page
          // reset();

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setName('');
          setLocation('');
          setImage('');
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
    }
  };

  const handleDelete = async (Id) => {

    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/reports/${Id}`,
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

          <section className="section-dishes">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
            </svg>
            <h2>Reports</h2>
            {error && <p className="error">{error}</p>}
            {admin.length > 0 ? (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Company's Name</th>
                      <th>Company's Location</th>
                      <th>Engineer</th>
                      <th>Date Reported</th>
                      <th>Report File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.map((e) => (
                      <>
                        <tr key={e._id}>
                          <td>{e.company.name}</td>
                          <td>{e.company.location}</td>
                          <td>{e.engineer.name}</td>
                          <td>
                            <DateTimeDisplay timestamp={e.reportDate} />
                          </td>
                          <td>{e.file}</td>
                          <td>
                            {
                              <>
                                <FaTrash
                                  className="click-order2-icon"
                                  onClick={() => openModal2(e._id)}
                                ></FaTrash>
                              </>
                            }
                          </td>
                        </tr>
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
                            <h3>Delete Report</h3>
                            <p>Are you sure you want to delete this report ?</p>

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
                      </>
                    ))}
                  </tbody>
                </table>
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

export default ReportPage;
