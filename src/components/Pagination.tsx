import './Pagination.css'

interface Props {
  pageNumbers: number[]
  currentPage: number
  onChangePage: (page: number) => void
}

export const Pagination: React.FC<Props> = ({ pageNumbers, currentPage, onChangePage }) => {
  return (
    <div className="Pagination">
      <ul className="Pagination-ul">
        {
          pageNumbers.map((page) => (
            <li key={page} className="Pagination-li">
              <button
                className={`
                  Pagination-button
                  ${currentPage === page ? 'active' : ''}
                  `}
                onClick={() => onChangePage(page)}
              >
                {page}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}