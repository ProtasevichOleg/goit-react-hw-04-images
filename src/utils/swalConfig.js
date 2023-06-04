// swalConfig.js
import Swal from 'sweetalert2';

const showMessage = message => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: message,
    timer: 3000,
  });
};

export default showMessage;
