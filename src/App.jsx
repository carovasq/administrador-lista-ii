import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import Container from "react-bootstrap/Container";
import { Form, Button, Table } from "react-bootstrap";
import userData from "../db.json";
import Swal from "sweetalert2";


function App() {
  const [usuarios, setUsuarios] = useState(userData.Usuario);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    email: "",
    telefono: "",
  });
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        nombre: "",
        apellido1: "",
        apellido2: "",
        email: "",
        telefono: "",
      });
    }
  }, [editingUser]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) {
      const newUsuario = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      };
      setUsuarios([...usuarios, newUsuario]);
      showSuccessMessage("Usuario creado correctamente");
    } else {
      const updatedUsuarios = usuarios.map((usuario) =>
        usuario.id === editingUser.id ? { ...usuario, ...formData } : usuario
      );
      setUsuarios(updatedUsuarios);
      setEditingUser(null);
      showSuccessMessage("Usuario actualizado correctamente");
    }
    setFormData({
      nombre: "",
      apellido1: "",
      apellido2: "",
      email: "",
      telefono: "",
    });
  };


  const handleEdit = (user) => {
    setEditingUser(user);
  };


  const handleDelete = (id) => {
    const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(updatedUsuarios);
    setEditingUser(null);
    showSuccessMessage("Usuario eliminado correctamente");
  };

  
  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: message,
    });
  };


  return (
    <Container>
      <Form className="my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Enter Nombre"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicApellido1">
          <Form.Label>Apellido 1</Form.Label>
          <Form.Control
            type="text"
            name="apellido1"
            value={formData.apellido1}
            onChange={handleChange}
            placeholder="Enter Apellido 1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicApellido2">
          <Form.Label>Apellido 2</Form.Label>
          <Form.Control
            type="text"
            name="apellido2"
            value={formData.apellido2}
            onChange={handleChange}
            placeholder="Enter Apellido 2"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            pattern="[0-9]{9}"
            placeholder="Enter Teléfono"
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="btn btn-primary animate__animated animate__heartBeat animate__infinite	infinite"
        >
          {editingUser ? "Actualizar" : "Crear"}
        </Button>
      </Form>
      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido 1</th>
            <th>Apellido 2</th>
            <th>Email de contacto</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido1}</td>
              <td>{usuario.apellido2}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td className="d-flex">
                <Button
                  className="animate__animated animate__pulse animate__infinite	infinite animate__slow	2s"
                  variant="info"
                  onClick={() => handleEdit(usuario)}
                >
                  Editar
                </Button>{" "}
                <Button
                  className="animate__animated animate__flash animate__infinite	infinite animate__slower	3s"
                  variant="danger"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
