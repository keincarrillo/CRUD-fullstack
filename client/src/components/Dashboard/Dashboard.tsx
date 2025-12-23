import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <div>Hola, {user?.name}</div>
      <button
        onClick={async () => {
          await signout()
          navigate('/signin', { replace: true })
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Dashboard
