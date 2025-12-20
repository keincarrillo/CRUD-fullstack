type Props = {
  variant: 'success' | 'error'
  message: string
}

const Alert = ({ variant, message }: Props) => {
  const styles =
    variant === 'success'
      ? 'bg-green-50 border-green-200 text-green-800'
      : 'bg-red-50 border-red-200 text-red-800'

  return (
    <div className={`mb-6 p-4 border rounded-lg ${styles}`}>
      <p className="text-center font-medium">{message}</p>
    </div>
  )
}

export default Alert
