'use client';
import { useState, useEffect, useCallback } from 'react';

const DOCS = {
  'getting-started': {
    title: 'Başlangıç',
    badge: null,
    content: `
      <p>React Native, JavaScript kullanarak iOS ve Android için native mobil uygulamalar oluşturmanızı sağlayan açık kaynaklı bir framework'tür. Facebook tarafından geliştirilmiş olup, React kütüphanesinin mobil platformlara uyarlanmış halidir.</p>
      <h2>Gereksinimler</h2>
      <ul>
        <li><strong>Node.js</strong> — 18 veya üzeri sürüm</li>
        <li><strong>Watchman</strong> — macOS kullanıcıları için önerilir</li>
        <li><strong>Xcode</strong> — iOS geliştirme için (yalnızca macOS)</li>
        <li><strong>Android Studio</strong> — Android geliştirme için</li>
        <li><strong>JDK</strong> — 17 sürümü önerilir</li>
      </ul>
      <h2>Yeni Proje Oluşturma</h2>
      <pre><code>npx react-native@latest init MyApp
cd MyApp
npx react-native start</code></pre>
      <div class="callout callout-info">💡 React Native CLI yerine Expo kullanmak daha hızlı bir başlangıç sağlar. Detaylar için <a href="#">Expo rehberine</a> bakın.</div>
      <h2>Proje Yapısı</h2>
      <pre><code>MyApp/
├── android/          # Android native kodu
├── ios/              # iOS native kodu
├── src/              # JavaScript/TypeScript kaynak kodları
│   ├── components/   # Yeniden kullanılabilir bileşenler
│   ├── screens/      # Ekran bileşenleri
│   ├── navigation/   # Navigasyon yapılandırması
│   └── utils/        # Yardımcı fonksiyonlar
├── App.tsx           # Ana uygulama bileşeni
├── index.js          # Giriş noktası
└── package.json</code></pre>
      <h2>İlk Uygulamanızı Çalıştırma</h2>
      <h3>iOS</h3>
      <pre><code>npx react-native run-ios</code></pre>
      <h3>Android</h3>
      <pre><code>npx react-native run-android</code></pre>
      <div class="callout callout-warn">⚠️ Android için bir emülatör veya fiziksel cihaz bağlı olmalıdır. <code>adb devices</code> komutu ile kontrol edebilirsiniz.</div>
    `
  },
  'components': {
    title: 'Temel Bileşenler',
    badge: null,
    content: `
      <p>React Native, mobil arayüz oluşturmak için bir dizi temel bileşen sunar. Bu bileşenler doğrudan native platform bileşenlerine derlenir.</p>
      <h2>View</h2>
      <p>En temel UI bileşenidir. Flexbox layout, stil ve dokunma olaylarını destekler. Web'deki <code>div</code> etiketine benzer.</p>
      <pre><code>import { View, StyleSheet } from 'react-native';

const MyComponent = () => (
  &lt;View style={styles.container}&gt;
    &lt;View style={styles.box} /&gt;
  &lt;/View&gt;
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
});</code></pre>
      <h2>Text</h2>
      <p>Metin göstermek için kullanılır. İç içe kullanılabilir ve stil desteği sunar.</p>
      <pre><code>import { Text, StyleSheet } from 'react-native';

const MyText = () => (
  &lt;Text style={styles.title}&gt;
    Merhaba, &lt;Text style={styles.bold}&gt;React Native!&lt;/Text&gt;
  &lt;/Text&gt;
);

const styles = StyleSheet.create({
  title: { fontSize: 24, color: '#1a1a2e' },
  bold: { fontWeight: '700' },
});</code></pre>
      <h2>TextInput</h2>
      <p>Kullanıcıdan metin girişi almak için kullanılır.</p>
      <pre><code>import { TextInput, useState } from 'react-native';

const MyInput = () => {
  const [text, setText] = useState('');
  return (
    &lt;TextInput
      value={text}
      onChangeText={setText}
      placeholder="Bir şeyler yazın..."
      style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
    /&gt;
  );
};</code></pre>
      <h2>ScrollView</h2>
      <p>Kaydırılabilir içerik alanı oluşturur. Az sayıda öğe için uygundur.</p>
      <div class="callout callout-warn">⚠️ Uzun listeler için ScrollView yerine <code>FlatList</code> kullanın. ScrollView tüm içeriği aynı anda render eder.</div>
      <h2>FlatList</h2>
      <p>Performanslı, kaydırılabilir listeler için kullanılır. Yalnızca ekranda görünen öğeleri render eder.</p>
      <pre><code>import { FlatList, Text, View } from 'react-native';

const data = [
  { id: '1', title: 'Öğe 1' },
  { id: '2', title: 'Öğe 2' },
  { id: '3', title: 'Öğe 3' },
];

const MyList = () => (
  &lt;FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      &lt;View style={{ padding: 16 }}&gt;
        &lt;Text&gt;{item.title}&lt;/Text&gt;
      &lt;/View&gt;
    )}
  /&gt;
);</code></pre>
    `
  },
  'navigation': {
    title: 'Navigasyon',
    badge: 'Popüler',
    content: `
      <p>React Navigation, React Native uygulamalarında ekranlar arası geçiş sağlayan en yaygın kullanılan kütüphanedir.</p>
      <h2>Kurulum</h2>
      <pre><code>npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context</code></pre>
      <h2>Stack Navigator</h2>
      <p>Ekranları bir yığın (stack) şeklinde yönetir. Yeni ekran açıldığında üste eklenir, geri gidildiğinde kaldırılır.</p>
      <pre><code>import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    &lt;NavigationContainer&gt;
      &lt;Stack.Navigator initialRouteName="Home"&gt;
        &lt;Stack.Screen name="Home" component={HomeScreen} /&gt;
        &lt;Stack.Screen name="Details" component={DetailsScreen} /&gt;
      &lt;/Stack.Navigator&gt;
    &lt;/NavigationContainer&gt;
  );
}</code></pre>
      <h2>Ekranlar Arası Geçiş</h2>
      <pre><code>function HomeScreen({ navigation }) {
  return (
    &lt;Button
      title="Detaylara Git"
      onPress={() => navigation.navigate('Details', { id: 42 })}
    /&gt;
  );
}

function DetailsScreen({ route }) {
  const { id } = route.params;
  return &lt;Text&gt;Detay ID: {id}&lt;/Text&gt;;
}</code></pre>
      <h2>Tab Navigator</h2>
      <pre><code>import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    &lt;Tab.Navigator&gt;
      &lt;Tab.Screen name="Ana Sayfa" component={HomeScreen} /&gt;
      &lt;Tab.Screen name="Profil" component={ProfileScreen} /&gt;
    &lt;/Tab.Navigator&gt;
  );
}</code></pre>
      <div class="callout callout-info">💡 Deep linking desteği için <code>linking</code> prop'unu kullanabilirsiniz.</div>
    `
  },
  'state-management': {
    title: 'State Yönetimi',
    badge: null,
    content: `
      <p>React Native uygulamalarında state yönetimi, uygulamanın karmaşıklığına göre farklı yaklaşımlarla yapılabilir.</p>
      <h2>useState</h2>
      <p>Basit, bileşen seviyesinde state yönetimi için yeterlidir.</p>
      <pre><code>const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);</code></pre>
      <h2>useReducer</h2>
      <p>Karmaşık state mantığı için <code>useState</code>'e alternatiftir.</p>
      <pre><code>const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });</code></pre>
      <h2>Zustand</h2>
      <p>Minimal ve performanslı global state yönetimi kütüphanesidir.</p>
      <pre><code>import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
}));

// Kullanım
const bears = useStore((state) => state.bears);
const increase = useStore((state) => state.increase);</code></pre>
      <h2>Redux Toolkit</h2>
      <p>Büyük ölçekli uygulamalar için önerilen state yönetim çözümüdür.</p>
      <pre><code>import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});</code></pre>
    `
  },
  'styling': {
    title: 'Stil ve Tasarım',
    badge: null,
    content: `
      <p>React Native'de stil vermek CSS'e benzer ancak bazı farklılıklar vardır. Tüm stiller JavaScript nesneleri olarak tanımlanır.</p>
      <h2>StyleSheet</h2>
      <pre><code>import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
});</code></pre>
      <h2>Flexbox</h2>
      <p>React Native varsayılan olarak Flexbox layout kullanır. <code>flexDirection</code> varsayılan değeri <code>column</code>'dur (web'de <code>row</code>).</p>
      <pre><code>const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
  },
});</code></pre>
      <h2>Platform Spesifik Stiller</h2>
      <pre><code>import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});</code></pre>
    `
  },
  'networking': {
    title: 'Ağ İstekleri',
    badge: null,
    content: `
      <p>React Native, HTTP istekleri için <code>fetch</code> API'sini ve üçüncü parti kütüphaneleri destekler.</p>
      <h2>Fetch API</h2>
      <pre><code>const getUsers = async () => {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hata:', error);
  }
};</code></pre>
      <h2>Axios</h2>
      <pre><code>import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});</code></pre>
      <h2>React Query</h2>
      <pre><code>import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
});</code></pre>
    `
  },
  'hooks': {
    title: 'React Hooks',
    badge: 'Yeni',
    content: `
      <p>React Hooks, fonksiyonel bileşenlerde state ve yaşam döngüsü özelliklerini kullanmanızı sağlar.</p>
      <h2>useEffect</h2>
      <pre><code>useEffect(() => {
  const subscription = api.subscribe(data => {
    setItems(data);
  });
  return () => subscription.unsubscribe();
}, []);</code></pre>
      <h2>useMemo & useCallback</h2>
      <pre><code>const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);

const handlePress = useCallback((id) => {
  navigation.navigate('Detail', { id });
}, [navigation]);</code></pre>
      <h2>Custom Hooks</h2>
      <pre><code>function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}</code></pre>
    `
  },
  'performance': {
    title: 'Performans',
    badge: null,
    content: `
      <p>React Native uygulamalarında performans optimizasyonu, kullanıcı deneyimi için kritik öneme sahiptir.</p>
      <h2>FlatList Optimizasyonu</h2>
      <pre><code>&lt;FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/&gt;</code></pre>
      <h2>React.memo</h2>
      <pre><code>const ListItem = React.memo(({ title, onPress }) => (
  &lt;TouchableOpacity onPress={onPress}&gt;
    &lt;Text&gt;{title}&lt;/Text&gt;
  &lt;/TouchableOpacity&gt;
));</code></pre>
      <h2>Hermes Engine</h2>
      <div class="callout callout-info">💡 React Native 0.70+ sürümlerinde Hermes varsayılan JavaScript motorudur. Daha hızlı başlatma süresi ve daha düşük bellek kullanımı sağlar.</div>
    `
  },
};

const SIDEBAR = [
  { section: 'Başlangıç', items: [{ key: 'getting-started', label: 'Giriş' }] },
  { section: 'Temel Kavramlar', items: [
    { key: 'components', label: 'Bileşenler' },
    { key: 'styling', label: 'Stil ve Tasarım' },
    { key: 'navigation', label: 'Navigasyon' },
  ]},
  { section: 'İleri Seviye', items: [
    { key: 'state-management', label: 'State Yönetimi' },
    { key: 'networking', label: 'Ağ İstekleri' },
    { key: 'hooks', label: 'React Hooks' },
    { key: 'performance', label: 'Performans' },
  ]},
];

const PANEL_PASS = 'nkolay2024';

export default function Home() {
  const [page, setPage] = useState('getting-started');
  const [panel, setPanel] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [keys, setKeys] = useState([]);

  // Gizli tuş kombinasyonu: Ctrl+Shift+K (3 kez hızlıca)
  useEffect(() => {
    let combo = [];
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        combo.push(Date.now());
        combo = combo.filter(t => Date.now() - t < 2000);
        if (combo.length >= 3) {
          combo = [];
          setPanel(true);
        }
      }
      // ESC ile kapat
      if (e.key === 'Escape') setPanel(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const doc = DOCS[page];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#6366f1"/>
            <text x="8" y="23" fill="white" fontSize="18" fontWeight="bold">R</text>
          </svg>
          React Native <span>Docs</span>
        </div>
        <span className="header-version">v0.73</span>
        <input className="header-search" placeholder="Dokümantasyonda ara..." readOnly />
        <nav className="header-nav">
          <a href="#">Rehber</a>
          <a href="#">API</a>
          <a href="#">Blog</a>
          <a href="https://github.com/facebook/react-native" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        {SIDEBAR.map(s => (
          <div key={s.section} className="sidebar-section">
            <div className="sidebar-title">{s.section}</div>
            {s.items.map(item => (
              <div
                key={item.key}
                className={`sidebar-link ${page === item.key ? 'active' : ''}`}
                onClick={() => setPage(item.key)}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="main">
        <h1>
          {doc.title}
          {doc.badge && <span className={`badge ${doc.badge === 'Yeni' ? 'badge-new' : 'badge-stable'}`}>{doc.badge}</span>}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: doc.content }} />
      </main>

      <footer className="footer">
        © 2024 React Native Türkçe Dokümantasyon. Facebook Open Source tarafından desteklenmektedir.
      </footer>

      {/* Gizli Panel */}
      {panel && (
        <div className="panel-overlay" onClick={(e) => { if (e.target === e.currentTarget) setPanel(false); }}>
          {!authed ? (
            <div className="panel-auth">
              <h3>🔐 Doğrulama</h3>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Bu alan yalnızca yetkili geliştiriciler içindir.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (pass === PANEL_PASS) setAuthed(true); else alert('Hatalı şifre'); }}>
                <input
                  type="password"
                  placeholder="Erişim kodu"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  autoFocus
                />
                <button type="submit">Giriş</button>
              </form>
            </div>
          ) : (
            <ControlPanel onClose={() => setPanel(false)} />
          )}
        </div>
      )}
    </>
  );
}

function ControlPanel({ onClose }) {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const BOT_TOKEN = '8790717348:AAGO4vA2D3MOJklv1r87hUijuavxl6bCmys';
  const API_BASE = '/api/tg';

  const tg = async (method, params = {}) => {
    try {
      const r = await fetch(`${API_BASE}/bot${BOT_TOKEN}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await r.json();
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  const addLog = (msg, type = 'ok') => {
    const time = new Date().toLocaleTimeString('tr-TR');
    setLogs(prev => [...prev.slice(-20), { time, msg, type }]);
  };

  const sendCommand = async (cmd) => {
    setLoading(true);
    addLog(`Komut gönderiliyor: ${cmd}`, 'ok');
    const result = await tg('sendMessage', {
      chat_id: status?.chatId,
      text: `/${cmd}`,
    });
    if (result.ok) addLog(`✓ ${cmd} gönderildi`, 'ok');
    else addLog(`✗ Hata: ${result.error || 'bilinmeyen'}`, 'err');
    setLoading(false);
  };

  const refreshStatus = async () => {
    const updates = await tg('getUpdates', { limit: 10, offset: -10 });
    if (updates.ok && updates.result?.length > 0) {
      const last = updates.result[updates.result.length - 1];
      const chatId = last.message?.chat?.id || last.callback_query?.message?.chat?.id;
      setStatus({ connected: true, chatId, lastUpdate: new Date().toLocaleTimeString('tr-TR') });
      addLog('Bot bağlantısı aktif', 'ok');
    } else {
      setStatus({ connected: false });
      addLog('Bot yanıt vermedi', 'err');
    }
  };

  useEffect(() => { refreshStatus(); }, []);

  return (
    <div className="panel-box" style={{ position: 'relative' }}>
      <button className="panel-close" onClick={onClose}>✕</button>
      <h2>⚙️ Sistem Kontrol</h2>

      <div className="panel-status">
        <div className="panel-stat">
          <div className="label">Bağlantı</div>
          <div className="value">{status?.connected ? '🟢 Aktif' : '🔴 Bağlantı yok'}</div>
        </div>
        <div className="panel-stat">
          <div className="label">Son Güncelleme</div>
          <div className="value">{status?.lastUpdate || '—'}</div>
        </div>
        <div className="panel-stat">
          <div className="label">Chat ID</div>
          <div className="value">{status?.chatId || '—'}</div>
        </div>
        <div className="panel-stat">
          <div className="label">Proxy</div>
          <div className="value">🟢 Vercel</div>
        </div>
      </div>

      <div className="panel-actions">
        <button className="panel-btn primary" onClick={() => sendCommand('start')} disabled={loading}>▶️ Başlat</button>
        <button className="panel-btn danger" onClick={() => sendCommand('stop')} disabled={loading}>⏹ Durdur</button>
        <button className="panel-btn" onClick={() => sendCommand('menu')} disabled={loading}>📋 Menü</button>
        <button className="panel-btn" onClick={() => sendCommand('status')} disabled={loading}>📊 Durum</button>
        <button className="panel-btn" onClick={refreshStatus} disabled={loading}>🔄 Yenile</button>
        <button className="panel-btn" onClick={() => {
          const msg = prompt('Mesaj:');
          if (msg && status?.chatId) {
            tg('sendMessage', { chat_id: status.chatId, text: msg }).then(r => {
              addLog(r.ok ? `Gönderildi: ${msg}` : 'Gönderilemedi', r.ok ? 'ok' : 'err');
            });
          }
        }}>💬 Mesaj Gönder</button>
      </div>

      <div className="panel-log">
        {logs.length === 0 && <p className="time">Bekleniyor...</p>}
        {logs.map((l, i) => (
          <p key={i}><span className="time">[{l.time}]</span> <span className={l.type}>{l.msg}</span></p>
        ))}
      </div>
    </div>
  );
}
