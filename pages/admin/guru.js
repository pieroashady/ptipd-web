import { Grid } from "@mui/material";
import moment from "moment";
import { getTeachers } from "../../lib/service/guru";
import WithAuth from "../../lib/session/withAuth";
import TeacherList from "../../src/components/dashboard/dashboard2/TeacherList";

export const getServerSideProps = WithAuth(async ({ query }) => {
  const teachersData = await getTeachers();
  return {
    props: {
      teachersData,
    },
  };
});

const Teacher = ({ teachersData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <TeacherList data={teachersData} />
      </Grid>
    </Grid>
  );
};

export default Teacher;
