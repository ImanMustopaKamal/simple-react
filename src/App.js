import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rows, setRows] = useState([
    { id: 1, name: "product name", price: 1000, qty: 1, subtotal: 1000 },
  ]);
  const [total, setTotal] = useState(0);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      name: "product name",
      price: 1000,
      qty: 1,
      subtotal: 1000,
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleInputChange = (id, event) => {
    const { value, name } = event.target;
    if (name === "qty" && value <= 0) {
      alert("Qty must be greater than 1");
      return false;
    }
    if (name === "price" && value <= 0) {
      alert("Price must be greater than 1");
      return false;
    }
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const subtotal = name === "qty" ? value * row.price : value * row.qty;
        return { ...row, [name]: value, subtotal };
      }
      return row;
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    if (rows.length !== 0) {
      let total = 0;
      rows.map((row) => {
        total += row.subtotal;
        return row;
      });
      setTotal(total);
    }
  }, [rows]);

  return (
    <div className="App">
      <Container style={{ marginTop: "20px" }}>
        <Button variant="primary" onClick={handleAddRow}>
          Add Row
        </Button>
        <Table style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Form.Control
                    placeholder={`product name`}
                    name="name"
                    type="text"
                    value={row.name}
                    onChange={(e) => handleInputChange(row.id, e)}
                  />
                </td>
                <td>
                  <Form.Control
                    placeholder="product price"
                    name="price"
                    type="number"
                    value={row.price}
                    onChange={(e) => handleInputChange(row.id, e)}
                  />
                </td>
                <td>
                  <Form.Control
                    placeholder="qty"
                    name="qty"
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleInputChange(row.id, e)}
                  />
                </td>
                <td>
                  <Form.Control
                    placeholder="subtotal"
                    name="subtotal"
                    type="number"
                    readOnly
                    value={row.subtotal}
                    onChange={(e) => handleInputChange(row.id, e)}
                  />
                </td>
                <td>
                  {rows.length !== 1 && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"></td>
              <td>
                <div>
                  <p>Total</p>
                  <Form.Control
                    placeholder="Total"
                    name="total"
                    type="number"
                    readOnly
                    value={total}
                  />
                </div>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </div>
  );
}

export default App;
