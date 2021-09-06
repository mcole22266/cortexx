import { Link } from 'react-router-dom';

export function MiniBankJumbotron() {
  return (
    <div className='App'>
      <div className='p-5 mb-4 bg-dark text-white rounded-3'>

        <div className='container py-5'>
          <h1 className='display-5 fw-bold'>OR CHECK OUT MINI-BANK</h1>
          <p className='fs-4'>
            What's Mini-Bank you ask?
          </p>

          <Link className='btn btn-primary' role='button'
            to="/minibank">
              Click here to find out!
            </Link>

        </div>
      </div>
    </div>
  );
}
