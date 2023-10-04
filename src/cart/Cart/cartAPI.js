// A mock function to mimic making an async request for data
import axios from 'axios'
export function fetchItems() {
  return axios.get("http://localhost:8000/cart")
}
export function AddItems(item) {
  return axios.post("http://localhost:8000/cart",item)
}
export function UpdateItems(id,updateitem) {
  return axios.patch(`http://localhost:8000/cart/${id}`,updateitem);
}
export function DeleteItems(id) {
  return axios.delete(`http://localhost:8000/cart/${id}`);
}

