import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()
  const registerUser = useAuthStore((s) => s.register)
  const addToast = useToastStore((s) => s.addToast)
  const navigate = useNavigate()
  const password = watch('password')

  function onSubmit(data) {
    const success = registerUser(data.name, data.email, data.password)
    if (success) {
      addToast('Account created — welcome to ForgeMind AI!', 'success')
      navigate('/dashboard')
    } else {
      addToast(useAuthStore.getState().error || 'Registration failed.', 'error')
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
            One workspace. Unlimited AI creativity.
          </h2>
          <p className="text-forge-muted mt-4 max-w-sm">
            Join creators, developers, and teams generating content 10x faster with ForgeMind AI.
          </p>
        </motion.div>

        <p className="text-sm text-forge-muted relative z-10">© {new Date().getFullYear()} ForgeMind AI</p>

        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-ember-gradient opacity-10 blur-3xl animate-float" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-semibold text-lg mb-10">
            <span className="w-8 h-8 rounded-lg bg-ember-gradient flex items-center justify-center">
              <Flame className="w-4 h-4 text-forge-bg" />
            </span>
            ForgeMind <span className="text-gradient">AI</span>
          </Link>

          <h1 className="font-display font-semibold text-2xl">Create your account</h1>
          <p className="text-forge-muted text-sm mt-2">Start forging — free, no credit card required.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              id="name"
              type="text"
              label="Full name"
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name is too short' } })}
            />
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <p className="text-sm text-forge-muted mt-8 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-forge-ember font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
