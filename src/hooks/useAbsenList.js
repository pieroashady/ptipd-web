import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { getAbsenSiswa } from '../../lib/service/absen-siswa';
import moment from 'moment';
import { isEmpty } from 'ramda';
import useInterval from './useInterval';

function useAbsenList(data) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;
  const [absen, setAbsen] = useState(data);

  useInterval(() => {
    async function getAbsen() {
      const { query } = routerRef.current;

      const today = moment().startOf('day').format('YYYY-MM-DD');
      const search = isEmpty(query) ? `tanggal=${today}` : `tanggal=${today}&${new URLSearchParams(query).toString()}`;

      const response = await getAbsenSiswa(search);
      setAbsen(response);
    }
    getAbsen();
  }, 10000);

  return {
    absen,
  };
}

export default useAbsenList;
