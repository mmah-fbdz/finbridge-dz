import { AuthLayout } from "@/components/auth/auth-layout"
import { CompanySetupForm } from "@/components/auth/company-setup-form"

export default function CompanySetupPage() {
  return (
    <AuthLayout>
      <CompanySetupForm />
    </AuthLayout>
  )
}
