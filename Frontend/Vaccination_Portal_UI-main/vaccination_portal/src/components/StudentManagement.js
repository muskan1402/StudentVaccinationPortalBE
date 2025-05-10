/*
import React, { useEffect, useState } from 'react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ name: '', class: '', id: '', vaccination_status: '', vaccine_name: '', vaccination_date: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/students");
      const data = await response.json();
      console.log("data", data.message);
      if (data.message === "No students found") {
        setStudents([]);
        setNoData(true);
      } else {
        setStudents(data);
        setNoData(false);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/studentdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response:", data);
      fetchStudentData();
      setShowForm(false); // Close the form after successful submission
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Error saving student data!");
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/vaccination_upload', {
        method: 'POST',
        body: data
      });
      const json = await response.json();
      if (json?.message === "Data Added Successfully") {
        fetchStudentData();
      }
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleVaccinate = (student) => {
    if (student.vaccinated === "yes") {
      alert('Already vaccinated with this vaccine!');
      return;
    }
    const updated = students.map((s) =>
      s.id === student.id ? { ...s, vaccinated: student.vaccinated, vaccine_name: student.vaccine_name } : s
    );
    setStudents(updated);
  };

  const filteredStudents = students?.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toString().includes(search) ||
      (s.vaccinated ? 'vaccinated' : 'not vaccinated').includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const checkFields = () => {
    return !formData.name || !formData.class || !formData.vaccination_status || (formData.vaccination_status === "yes" && (!formData.vaccine_name || !formData.vaccination_date));
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Student Management</h3>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add/Edit Student
        </button>
        <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ maxWidth: 200 }} />
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, class, ID, status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 250 }}
        />
      </div>

      {noData ? (
        <div className="alert alert-warning">No students found.</div>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>ID</th>
              <th>Vaccinated</th>
              <th>Vaccine</th>
              <th>Vaccinated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No Data Found</td>
              </tr>
            ) : (
              currentItems?.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.id}</td>
                  <td>{s.vaccinated}</td>
                  <td>{s.vaccine_name || '-'}</td>
                  <td>{s.vaccine_date || '-'}</td>
                  <td>
                    <button
                      className={`btn ${(s.vaccine_name && s.vaccine_date) ? "btn-success" : "btn-danger"} btn-sm `}
                      onClick={() => handleVaccinate(s)}
                    >
                      {(s.vaccine_name && s.vaccine_date) ? 'Vaccinated' : 'Vaccinate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {showForm && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ justifyContent: 'space-between' }}>
                <h5 className="modal-title">Add/Edit Student</h5>
                <button type="button" className="close" onClick={() => setShowForm(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Class</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Vaccination Status</label>
                    <select
                      className="form-control"
                      value={formData.vaccination_status}
                      onChange={(e) =>
                        setFormData({ ...formData, vaccination_status: e.target.value })
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {formData.vaccination_status === "yes" && (
                    <>
                      <div className="form-group">
                        <label>Vaccination Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={formData.vaccination_date}
                          onChange={(e) => setFormData({ ...formData, vaccination_date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Vaccine Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.vaccine_name}
                          onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <button className="btn btn-primary mt-3" type="submit" disabled={checkFields()}>
                    Save Student
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
*/
import React, { useEffect, useState } from 'react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ name: '', class: '', id: '', vaccination_status: '', vaccine_name: '', vaccination_date: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/students");
      const data = await response.json();
      if (data.message === "No students found") {
        setStudents([]);
        setNoData(true);
      } else {
        setStudents(data);
        setNoData(false);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/vaccination_upload', {
        method: 'POST',
        body: data
      });
      const json = await response.json();
      if (json?.message === "Data Added Successfully") fetchStudentData();
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/studentdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      await response.json();
      fetchStudentData();
      setShowForm(false);
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Error saving student data!");
    }
  };

  const handleVaccinate = (student) => {
    if (student.vaccinated === "yes") {
      alert('Already vaccinated with this vaccine!');
      return;
    }
    const updated = students.map((s) =>
      s.id === student.id ? { ...s, vaccinated: "yes", vaccine_name: s.vaccine_name } : s
    );
    setStudents(updated);
  };

  const filteredStudents = students?.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toString().includes(search) ||
      (s.vaccinated ? 'vaccinated' : 'not vaccinated').includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  const checkFields = () => {
    return !formData.name || !formData.class || !formData.vaccination_status ||
      (formData.vaccination_status === "yes" && (!formData.vaccine_name || !formData.vaccination_date));
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;
  }

  return (
    <div className="container mt-4 small" style={{ fontSize: '18px' }}>
      <h5>Student Management</h5>

      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>Add/Edit Student</button>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search"
          style={{ maxWidth: 250 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {noData ? (
        <div className="alert alert-warning">No students found.</div>
      ) : (
        <div className="row">
          {currentItems.length === 0 ? (
            <div className="col-12 text-center">No matching students.</div>
          ) : (
            currentItems.map((s, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div className="card h-100 border-primary">
                  <div className="card-body small">
                    <h6 className="card-title">{s.name}</h6>
                    <p className="mb-1"><strong>Class:</strong> {s.class}</p>
                    <p className="mb-1"><strong>ID:</strong> {s.id}</p>
                    <p className="mb-1"><strong>Status:</strong> {s.vaccinated || 'No'}</p>
                    <p className="mb-1"><strong>Vaccine:</strong> {s.vaccine_name || '-'}</p>
                    <p className="mb-1"><strong>Date:</strong> {s.vaccine_date || '-'}</p>
                    <button
                      className={`btn btn-sm ${s.vaccinated === "yes" ? "btn-success" : "btn-danger"}`}
                      onClick={() => handleVaccinate(s)}
                    >
                      {s.vaccinated === "yes" ? 'Vaccinated' : 'Vaccinate'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-outline-secondary btn-sm me-1"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm me-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setCurrentPage(i + 1)}
          >{i + 1}</button>
        ))}
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >Next</button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: '#00000088' }}>
          <div className="modal-dialog">
            <div className="modal-content small">
              <div className="modal-header">
                <h6 className="modal-title">Add/Edit Student</h6>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group mb-2">
                    <label>Name</label>
                    <input type="text" className="form-control form-control-sm" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="form-group mb-2">
                    <label>Class</label>
                    <input type="text" className="form-control form-control-sm" value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })} required />
                  </div>
                  <div className="form-group mb-2">
                    <label>Vaccination Status</label>
                    <select className="form-control form-control-sm" value={formData.vaccination_status}
                      onChange={(e) => setFormData({ ...formData, vaccination_status: e.target.value })} required>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {formData.vaccination_status === "yes" && (
                    <>
                      <div className="form-group mb-2">
                        <label>Vaccine Name</label>
                        <input type="text" className="form-control form-control-sm" value={formData.vaccine_name}
                          onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })} required />
                      </div>
                      <div className="form-group mb-2">
                        <label>Vaccination Date</label>
                        <input type="date" className="form-control form-control-sm" value={formData.vaccination_date}
                          onChange={(e) => setFormData({ ...formData, vaccination_date: e.target.value })} required />
                      </div>
                    </>
                  )}
                  <button className="btn btn-primary btn-sm mt-2" type="submit" disabled={checkFields()}>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
