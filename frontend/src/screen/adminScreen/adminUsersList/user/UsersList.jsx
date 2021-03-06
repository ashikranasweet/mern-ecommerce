import React from "react";
import "./usersList.scss";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../../../store/usersStore/usersStore";
import { CircularProgress, Alert, IconButton, Button } from "@mui/material";
import { Check, Clear, Delete, Edit } from "@mui/icons-material";
import UserEdit from "./UserEdit";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isError, error, isLoading } = useGetAllUsersQuery();
  const [deleteuser, {}] = useDeleteUserMutation();

  const handleDelete = (id) => {
    deleteuser(id);
    console.log("user delete", id);
  };

  return (
    <div className="usersList">
      <div className="title">Show All users</div>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert>{error}</Alert>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>isAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="isAdmin">
                  {user.isAdmin ? (
                    <Check color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </td>
                <td data-label="Actions" className="update-btns">
                  <div className="actions">
                    <Button
                      onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                      variant="contained"
                      color="success"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDelete(user._id)}
                      sx={{ ml: 1 }}
                      variant="outlined"
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
