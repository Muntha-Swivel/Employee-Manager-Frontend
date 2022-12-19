import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { PrimaryButton, PictureButton } from "@atoms";
import { CardView, TableView } from "@organisms";
import Stack from "@mui/material/Stack";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";
import { IEmployeePageTemplateInterface } from "./employeePageTemplate.interface";
import { useRouter } from "next/router";
import { DeleteModal } from "@molecules";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, selectEmployee } from "app/store";

function EmployeePageTemplate({ employees }: IEmployeePageTemplateInterface) {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const content = useSelector(selectEmployee());
  const employee = content.delEmp;

  const [isModalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const onClickDeleteBtnOnModal = () => {
    dispatch(deleteEmployee(employee._id));
    setModalOpen(false);
    //this function runs when the delete button on modal in clicked
  };

  return (
    <>
      <DeleteModal
        employee={employee}
        isOpen={isModalOpen}
        onClickClose={() => setModalOpen(false)}
        onClickDelete={onClickDeleteBtnOnModal}
      />
      <Box>
        <Stack>
          <Grid
            container
            justifyContent="flex-end"
            direction="row"
            spacing={0}
            mb={2}
          >
            <Grid item>
              <PrimaryButton
                text="Add Employee"
                onClick={() => router.push("/employee/addEmployee")}
              />
            </Grid>
            <Grid item>
              <PictureButton
                icon={gridView ? <ReorderIcon /> : <GridViewIcon />}
                onClick={() => setGridView(!gridView)}
              />
            </Grid>
          </Grid>
          {gridView ? (
            <CardView
              data={employees}
              onClickDelete={() => setModalOpen(true)}
            />
          ) : (
            <TableView
              data={employees}
              onClickDelete={() => setModalOpen(true)}
            />
          )}
        </Stack>
      </Box>
    </>
  );
}

export { EmployeePageTemplate };
