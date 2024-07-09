import { Footer } from "antd/es/layout/layout"

const AppFooter = () => {
    return (
        <Footer
            style={{
            textAlign: 'center',
            }}
        >
            IPAYNOW ©{new Date().getFullYear()}
        </Footer>
    )
}

export default AppFooter;