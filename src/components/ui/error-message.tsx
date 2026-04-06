import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './button'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ 
  title = 'Algo salió mal',
  message = 'Ocurrió un error inesperado. Inténtalo de nuevo.',
  onRetry,
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-8 text-center ${className}`}>
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-5 h-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground text-sm max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Intentar de nuevo
        </Button>
      )}
    </div>
  )
}