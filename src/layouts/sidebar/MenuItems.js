const Menuitems = [
  {
    navlabel: true,
    subheader: 'MENU',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Dashboard',
  },
  // {
  //   title: "Scan Absen",
  //   icon: "pie-chart",
  //   href: "/dashboards/scan-absen",
  // },
  {
    title: 'Dashboard',
    icon: 'pie-chart',
    href: '/admin/absen',
    role: 'admin',
  },
  {
    title: 'Kehadiran Siswa',
    icon: 'pie-chart',
    href: '/guru/absen',
    role: 'guru',
  },
  {
    title: 'Siswa',
    icon: 'users',
    href: '/admin/siswa',
    role: 'admin',
  },
  {
    title: 'Guru',
    icon: 'users',
    href: '/admin/guru',
    role: 'admin',
  },
  {
    title: 'Jurusan',
    icon: 'server',
    href: '/admin/jurusan',
    role: 'admin',
  },
  {
    title: 'Kelas',
    icon: 'server',
    href: '/admin/kelas',
    role: 'admin',
  },
  {
    title: 'Mata Pelajaran',
    icon: 'server',
    href: '/admin/mapel',
    role: 'admin',
  },
  {
    title: 'Guru Mata Pelajaran',
    icon: 'server',
    href: '/admin/jadwal-mapel',
    role: 'admin',
  },
];

export default Menuitems;
