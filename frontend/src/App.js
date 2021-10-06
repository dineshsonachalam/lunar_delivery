import {Layout} from 'antd';
import Nav from "./components/Nav";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Nav />
          <Layout style={{ padding: '24px 24px 24px' }}>
            <Calendar />
          </Layout>
        </Layout>
    </div>
  );
}

export default App;