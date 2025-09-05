import { useState } from 'react'
import './App.css'
import { FrontPage } from './pages/frontpage/frontpage.page'
import { Routes, Route } from 'react-router-dom'
import { ErrorPage } from './pages/errorPage/error.page'
import { Navbar } from './components/navbar/navbar.component'
import { Layout } from './components/layout/layout.component'
import { ProductsPage } from './pages/productsPage/products.page'
import { Footer } from './components/footer/footer.component'
import { SingleProductPage } from './pages/singleProductPage/singleProduct.page'
import { useAuth } from './components/providers/auth.provider'
import { LoginPage } from './pages/loginPage/login.page'
import { Navigate } from 'react-router'
import { ProfilePage } from './pages/profilePage/profile.page'
import { SignUpPage } from './pages/signUpPage/signUp.page'
import { CreateProductPage } from './pages/createProduct/createProduct.page'

function App() {
  const {loginData} = useAuth();


  return (
    <>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/produkter" element={<ProductsPage />} />
          <Route path="/produkter/:categorySlug" element={<ProductsPage />} />
          <Route path="/produkter/:categorySlug/:productSlug" element={<SingleProductPage />} />
          {!loginData ? (
              <Route path="/login" element={<LoginPage />} />

          ) : (
            <Route path="/login" element={<Navigate to="/profil" replace />} />
          )}
          {loginData ? (
            <Route path="/profil" element={<ProfilePage />} />
          ) : (
            <Route path="/profil" element={<Navigate to="/login" replace />} />
          )}

          {!loginData ? (
              <Route path="/signup" element={<SignUpPage />} />
          ) : (
            <Route path="/signup" element={<Navigate to="/profil" replace />} />
          )}
          {loginData ? (
            <Route path="/opret-annonce" element={<CreateProductPage />} />
          ) : (
            <Route path="/opret-annonce" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  )
}

export default App
