export default () => ({
  // user: {
  //     nombre: "",
  //     email: "",
  //     password: "",
  //     idRol: 1,
  //     Id_Estado: 1,
  //     Id_Ayuntamiento: 1
  // },
  // userEdit: {

  // },
  // ayutanmientos: [],
  // Estado: [],
  // Rol: [],
  // users:[]

  // Inventario objetos

  inventario: [
    // {
    //   Código: 1,
    //   Descripción: 'Copiadora',
    //   Tipo: '',
    //   Existencia: 2,
    // },
    // {
    //   Código: 2,
    //   Descripción: 'Escoba',
    //   Tipo: '',
    //   Existencia: 2,
    // },
    // {
    //   Código: 3,
    //   Descripción: 'Computadora',
    //   Tipo: '',
    //   Existencia: 1,
    // },
  ],

  //Direccion dependencia

  direccionDependencia: [
    {
      Código: 1,
      Programa: '1-COMITE EJECUTIVO',
      'Fecha inicio': '2012/05/07',
    },
    {
      Código: 2,
      Programa: '10-SUB-SEC. DE GEST. Y ASIST. TEC. MNCPL',
      'Fecha inicio': '2018/04/12',
    },
    {
      Código: 3,
      Programa: '10.1-OBSERVATORIO MUNICIPAL',
      'Fecha inicio': '2022/10/11',
    },
    {
      Código: 4,
      Programa: '10.1.1-SECCION DE ESTADISTICA',
      'Fecha inicio': '2015/01/09 ',
    },
  ],

  departamentos: [
    {
      Código: 1,
      Departamento: '3.1-DPTO. DE LITIGIOS',
      Programa: '3-DIRECCION JURIDICA',
      'Grupo de nomina': 'PERSONAL FIJO',
      'Estructura Prog.': '1111',
      Clasificador: ' ',
      'Limitado Rep.': ' ',
    },
    {
      Código: 2,
      Departamento: '3.2-DPTO. DE ELAB. DE DOC. LEGALES',
      Programa: '3-DIRECCION JURIDICA',
      'Grupo de nomina': 'PERSONAL FIJO',
      'Estructura Prog.': '',
      Clasificador: ' ',
      'Limitado Rep.': ' ',
    },
    {
      Código: 3,
      Departamento: '10.2-DPTO. DE ENLACE CON LOS AYTOS',
      Programa: '10-SUB-SEC. DE GEST. Y ASIST. TEC. MNCPL',
      'Grupo de nomina': 'PERSONAL FIJO',
      'Estructura Prog.': '0011010001',
      Clasificador: '211101',
      'Limitado Rep.': ' ',
    },
  ],

  areasTrabajo: [
    {
      Código: 1,
      'Área de trabajo': 'Despacho del Alcalde',
    },
    {
      Código: 2,
      'Área de trabajo': 'Concejo Regidores/Vocales',
    },
    {
      Código: 3,
      'Área de trabajo': 'Área Financiera',
    },
    {
      Código: 4,
      'Área de trabajo': 'Juridico',
    },
    {
      Código: 5,
      'Área de trabajo': 'Contabilidad',
    },
  ],

  posicionesCargos: [
    {
      Código: 1,
      'Posicion o cargo': '1-RECEPCIONISTA-TARDE',
    },
    {
      Código: 2,
      'Posicion o cargo': '2-SUB-SECRETARIO',
    },
    {
      Código: 3,
      'Posicion o cargo': '3-ASESOR(A)',
    },
    {
      Código: 4,
      'Posicion o cargo': 'AUXILIAR',
    },
    {
      Código: 5,
      'Posicion o cargo': 'SECRETARIA',
    },
    {
      Código: 6,
      'Posicion o cargo': 'MENSAJERO',
    },
    {
      Código: 7,
      'Posicion o cargo': 'INSPECTOR(A)',
    },
    {
      Código: 8,
      'Posicion o cargo': 'GOMERO',
    },
    {
      Código: 9,
      'Posicion o cargo': 'DIRECTOR(A)',
    },
    {
      Código: 10,
      'Posicion o cargo': 'ENCARGADO(A)',
    },
    {
      Código: 11,
      'Posicion o cargo': 'CAMARERO',
    },
  ],

  profesion: [
    {
      Código: 1,
      Profesión: 'Ingeniero civil',
    },
  ],

  sectores: [
    {
      Código: 1,
      sectores: 'GENERAL',
    },
  ],

  tipoSangre: [
    {
      Código: 1,
      'Tipo de sangre': 'RHO+',
    },
    {
      Código: 2,
      'Tipo de sangre': 'A+',
    },
    {
      Código: 3,
      'Tipo de sangre': 'O+',
    },
    {
      Código: 4,
      'Tipo de sangre': 'B+',
    },
    {
      Código: 5,
      'Tipo de sangre': 'RHO-',
    },
    {
      Código: 6,
      'Tipo de sangre': 'A-',
    },
    {
      Código: 7,
      'Tipo de sangre': 'O-',
    },
    {
      Código: 8,
      'Tipo de sangre': 'B-',
    },
  ],

  registroPersonal: [
    {
      Apellido: 'VALDEZ ALCEQUIES',
      Nombre: 'SONIA',
      Cédula: '001-0004779-4',
      Código: '7878',
      Programa: '6-DIRECCION DE RECURSOS HUMANOS',
      'Direccion o Dependencia': 'DIRECCION DE RECURSOS HUMANOS',
      Cargo: 'PROC. DE PENSION',
      'Fecha de ingreso': '1/02/2009',
      'Fecha de nacimiento': '10/11/1963',
      Edad: '58',
      Sexo: 'Femenino',
      Sueldo: '30,000.00 RD$',
    },
    {
      Apellido: 'JIMENEZ CORDERO',
      Nombre: 'EDWING FRANCISCO',
      Cédula: '001-0004972-5',
      Código: '377',
      Programa: '16-DIR. DE CAP. Y FORM',
      'Direccion o Dependencia': '',
      Cargo: '',
      'Fecha de ingreso': '01/01/1999',
      'Fecha de nacimiento': '28/10/1963',
      Edad: '58',
      Sexo: 'MASCULINO',
      Sueldo: '25,000.00 RD$',
    },
    {
      Apellido: 'CASTILLO GUERRERO',
      Nombre: 'MARIA',
      Cédula: '001-0007884-9',
      Código: '387',
      Programa: '10-SUB-SEC. DE GEST. MNCPL',
      'Direccion o Dependencia': ' ',
      Cargo: 'PROC. DE PENSION',
      'Fecha de ingreso': '1/01/2002',
      'Fecha de nacimiento': '22/07/1951',
      Edad: '70',
      Sexo: 'FEMENINO',
      Sueldo: '15,000.00 RD$',
    },
  ],

  reclutamientoSolicitud: [
    {
      'Solicitud No.': '',
      'Nombre solicitante': '',
      Teléfono: '',
      Edad: '',
      Entrevistado: '',
      Evaluado: '',
      Califica: '',
    },
  ],
})
