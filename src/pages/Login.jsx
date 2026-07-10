import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const login = useAuthStore((s) => s.login)
  const addToast = useToastStore((s) => s.addToast)
  const navigate = useNavigate()
  const location = useLocation()

  function onSubmit(data) {
    const success = login(data.email, data.password)
    if (success) {
      addToast('Welcome back!', 'success')
      navigate(location.state?.from?.pathname || '/dashboard')
    } else {
      addToast(useAuthStore.getState().error || 'Login failed.', 'error')
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-forge-bg">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-forge-glow relative overflow-hidden border-r border-white/5">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg relative z-10">
          <span className="w-8 h-8 rounded-lg bg-ember-gradient flex items-center justify-center">
            <Flame className="w-4 h-4 text-forge-bg" />
          </span>
          ForgeMind <span className="text-gradient">AI</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="font-display font-semibold text-4xl leading-tight max-w-md">
            Welcome back to your creative workspace.
          </h2>
          <p className="text-forge-muted mt-4 max-w-sm">
            Pick up right where you left off — your history, favorites, and templates are all waiting.
          </p>
        </motion.div>

        <p className="text-sm text-forge-muted relative z-10">© {new Date().getFullYear()} ForgeMind AI</p>

        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-ember-gradient opacity-10 blur-3xl animate-float" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-semibold text-lg mb-10">
            <span className="w-8 h-8 rounded-lg bg-ember-gradient flex items-center justify-center">
              <Flame className="w-4 h-4 text-forge-bg" />
            </span>
            ForgeMind <span className="text-gradient">AI</span>
          </Link>

          <h1 className="font-display font-semibold text-2xl">Log in to your account</h1>
          <p className="text-forge-muted text-sm mt-2">Enter your credentials to continue forging.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Log In
            </Button>
          </form>

          <p className="text-sm text-forge-muted mt-8 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-forge-ember font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
