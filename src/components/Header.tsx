import './Header.css'

interface Props {
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Header: React.FC<Props> = ({ onHandleChange }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <header className='Header'>
      <h1 className='Header-h1'>App de Posts</h1>
      <form className='Header-form' onSubmit={handleSubmit}>
        <label className='Header-label'>
          Buscar por título o contenido
          <input
            className='Header-input'
            name='search'
            type="text"
            onChange={onHandleChange}
            placeholder='¿Quiéres buscar algo?'
          />
        </label>
      </form>
    </header>
  )
}