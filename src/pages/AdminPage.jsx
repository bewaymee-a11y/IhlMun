import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Settings, Users, Image, Mic, BookOpen,
  Download, Trash2, Edit, Plus, Save, X, AlertCircle, ChevronDown
} from 'lucide-react';
import axios from 'axios';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Admin Login Component
const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API}/admin/login`, { username, password });
      localStorage.setItem('admin_token', res.data.access_token);
      onLogin();
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary mx-auto flex items-center justify-center mb-4">
            <span className="font-heading font-bold text-black text-2xl">IHL</span>
          </div>
          <h1 className="font-heading text-3xl">Admin Panel</h1>
          <p className="text-text-muted text-sm mt-2">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm text-text-muted mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-minimal"
              placeholder="Enter username"
              data-testid="admin-username"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-minimal"
              placeholder="Enter password"
              data-testid="admin-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-btn"
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Admin Dashboard
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    registrations: [],
    committees: [],
    secretariat: [],
    speakers: [],
    media: [],
    settings: null,
  });

  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regs, comms, secs, spks, media, settings] = await Promise.all([
        axios.get(`${API}/admin/registrations`, { headers }),
        axios.get(`${API}/committees`),
        axios.get(`${API}/secretariat`),
        axios.get(`${API}/speakers`),
        axios.get(`${API}/media`),
        axios.get(`${API}/settings`),
      ]);
      setData({
        registrations: regs.data,
        committees: comms.data,
        secretariat: secs.data,
        speakers: spks.data,
        media: media.data,
        settings: settings.data,
      });
    } catch (e) {
      console.error('Error fetching data:', e);
      if (e.response?.status === 401) onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'committees', label: 'Committees', icon: BookOpen },
    { id: 'secretariat', label: 'Secretariat', icon: Users },
    { id: 'speakers', label: 'Speakers', icon: Mic },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-white/5 sticky top-0 z-40">
        <div className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="font-heading font-bold text-black text-sm">IHL</span>
            </div>
            <span className="font-heading text-lg">Admin Panel</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
            data-testid="admin-logout-btn"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </header>

      <div className="container-main py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-black'
                  : 'bg-surface border border-white/10 text-text-muted hover:text-white'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {activeTab === 'registrations' && (
              <RegistrationsTab
                data={data.registrations}
                committees={data.committees}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'committees' && (
              <CommitteesTab
                data={data.committees}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'secretariat' && (
              <SecretariatTab
                data={data.secretariat}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'speakers' && (
              <SpeakersTab
                data={data.speakers}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'media' && (
              <MediaTab
                data={data.media}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab
                data={data.settings}
                headers={headers}
                onRefresh={fetchData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Registrations Tab
const RegistrationsTab = ({ data, headers, onRefresh, committees }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCommittee, setFilterCommittee] = useState('');
  const [expandedReg, setExpandedReg] = useState(null);

  const statuses = ['Under Review', 'Reviewed', 'Not Reviewed', 'Accepted', 'Rejected', 'Waitlisted'];
  const statusColors = {
    'Under Review': 'bg-yellow-500/20 text-yellow-400',
    'Reviewed': 'bg-blue-500/20 text-blue-400',
    'Not Reviewed': 'bg-gray-500/20 text-gray-400',
    'Accepted': 'bg-green-500/20 text-green-400',
    'Rejected': 'bg-red-500/20 text-red-400',
    'Waitlisted': 'bg-purple-500/20 text-purple-400',
  };

  const handleExport = () => {
    window.open(`${API}/admin/registrations/export`, '_blank');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    try {
      await axios.delete(`${API}/admin/registrations/${id}`, { headers });
      onRefresh();
    } catch (e) {
      console.error('Error deleting registration:', e);
    }
  };

  const handleStatusChange = async (regId, newStatus) => {
    try {
      await axios.put(`${API}/admin/registrations/${regId}/status`, { status: newStatus }, { headers });
      onRefresh();
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  // Filter data
  const filteredData = data.filter(reg => {
    if (filterStatus && reg.status !== filterStatus) return false;
    if (filterCommittee && reg.committee_id !== filterCommittee) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-heading text-2xl">Applications ({filteredData.length})</h2>
        <button
          onClick={handleExport}
          className="btn-secondary flex items-center gap-2"
          data-testid="export-csv-btn"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-surface border border-white/5">
        <div>
          <label className="block text-xs text-text-muted mb-1">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-highlight border border-white/10 px-3 py-2 text-sm text-white"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">Filter by Committee</label>
          <select
            value={filterCommittee}
            onChange={(e) => setFilterCommittee(e.target.value)}
            className="bg-surface-highlight border border-white/10 px-3 py-2 text-sm text-white"
          >
            <option value="">All Committees</option>
            {committees?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-white/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-highlight border-b border-white/5">
            <tr>
              <th className="text-left p-4 text-text-muted font-normal">Name</th>
              <th className="text-left p-4 text-text-muted font-normal">Contact</th>
              <th className="text-left p-4 text-text-muted font-normal">Committee</th>
              <th className="text-left p-4 text-text-muted font-normal">Status</th>
              <th className="text-left p-4 text-text-muted font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((reg) => (
              <>
                <tr key={reg.id} className="border-b border-white/5 hover:bg-surface-highlight cursor-pointer" onClick={() => setExpandedReg(expandedReg === reg.id ? null : reg.id)}>
                  <td className="p-4">
                    <div className="font-medium">{reg.full_name}</div>
                    <div className="text-xs text-text-muted">{reg.institution}</div>
                  </td>
                  <td className="p-4 text-text-muted">
                    <div>{reg.email}</div>
                    <div className="text-xs">{reg.telegram}</div>
                  </td>
                  <td className="p-4 text-primary text-xs">{reg.committee_name}</td>
                  <td className="p-4">
                    <select
                      value={reg.status || 'Under Review'}
                      onChange={(e) => { e.stopPropagation(); handleStatusChange(reg.id, e.target.value); }}
                      onClick={(e) => e.stopPropagation()}
                      className={`px-2 py-1 text-xs font-mono ${statusColors[reg.status] || statusColors['Under Review']} border-0 cursor-pointer`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(reg.id); }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
                {expandedReg === reg.id && (
                  <tr key={`${reg.id}-details`} className="bg-surface-highlight">
                    <td colSpan="5" className="p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-heading text-primary mb-2">Why attend IHL MUN?</h4>
                          <p className="text-text-muted whitespace-pre-wrap">{reg.why_attend || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-heading text-primary mb-2">MUN Experience</h4>
                          <p className="text-text-muted">{reg.mun_experience || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-heading text-primary mb-2">Why this committee?</h4>
                          <p className="text-text-muted">{reg.why_committee || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-heading text-primary mb-2">Alternative Committees</h4>
                          <p className="text-text-muted">{reg.alternative_committees || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-heading text-primary mb-2">Consent to Interview</h4>
                          <p className={reg.consent_interview ? 'text-green-400' : 'text-red-400'}>{reg.consent_interview ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <h4 className="font-heading text-primary mb-2">Applied</h4>
                          <p className="text-text-muted">{new Date(reg.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-text-muted">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Committees Tab
const CommitteesTab = ({ data, headers, onRefresh }) => {
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleToggleRegistration = async (committee) => {
    try {
      await axios.put(
        `${API}/admin/committees/${committee.id}`,
        { ...committee, registration_open: !committee.registration_open },
        { headers }
      );
      onRefresh();
    } catch (e) {
      console.error('Error updating committee:', e);
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Committees ({data.length})</h2>
      <div className="space-y-4">
        {data.map((comm) => (
          <div key={comm.id} className="bg-surface border border-white/5">
            <button
              onClick={() => setExpanded(expanded === comm.id ? null : comm.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-cover bg-center rounded"
                  style={{ backgroundImage: `url('${comm.background_image}')` }}
                />
                <div>
                  <h3 className="font-heading text-lg">{comm.name_ru || comm.name}</h3>
                  <span className={`text-xs font-mono ${comm.registration_open ? 'text-green-400' : 'text-red-400'}`}>
                    Registration {comm.registration_open ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
              <ChevronDown size={20} className={`transform transition-transform ${expanded === comm.id ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded === comm.id && (
              <div className="p-4 pt-0 border-t border-white/5">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handleToggleRegistration(comm)}
                    className={`text-xs px-3 py-1 ${comm.registration_open ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
                  >
                    {comm.registration_open ? 'Close Registration' : 'Open Registration'}
                  </button>
                </div>
                <div className="text-sm text-text-muted">
                  <p className="mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc list-inside mb-4">
                    {comm.agenda?.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p><strong>Chairs:</strong> {comm.chairs?.length || 0}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Generic CRUD Tab Component
const CrudTab = ({ title, data, headers, endpoint, fields, onRefresh }) => {
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSave = async () => {
    try {
      if (editing) {
        await axios.put(`${API}${endpoint}/${editing}`, formData, { headers });
      } else {
        await axios.post(`${API}${endpoint}`, formData, { headers });
      }
      setEditing(null);
      setCreating(false);
      setFormData({});
      onRefresh();
    } catch (e) {
      console.error('Error saving:', e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API}${endpoint}/${id}`, { headers });
      onRefresh();
    } catch (e) {
      console.error('Error deleting:', e);
    }
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setFormData(item);
    setCreating(false);
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    const defaultData = {};
    fields.forEach(f => defaultData[f.name] = f.default || '');
    setFormData(defaultData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl">{title} ({data.length})</h2>
        <button onClick={startCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add New
        </button>
      </div>

      {/* Form */}
      {(editing || creating) && (
        <div className="bg-surface border border-primary/30 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-lg">{editing ? 'Edit' : 'Create New'}</h3>
            <button onClick={() => { setEditing(null); setCreating(false); }} className="text-text-muted hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-text-muted mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full bg-surface-highlight border border-white/10 p-2 text-white resize-none h-24"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? parseInt(e.target.value) : e.target.value })}
                    className="w-full bg-surface-highlight border border-white/10 p-2 text-white"
                  />
                )}
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={16} />
            Save
          </button>
        </div>
      )}

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-surface border border-white/5 p-4">
            <div className="flex gap-4 mb-3">
              {item.photo_url && (
                <div className="w-16 h-16 bg-surface-highlight bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${item.photo_url}')` }} />
              )}
              <div>
                <h4 className="font-heading">{item.name}</h4>
                <p className="text-primary text-sm">{item.role || item.title}</p>
              </div>
            </div>
            <p className="text-text-muted text-sm mb-4">{item.experience}</p>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-text-muted hover:text-primary">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-text-muted hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Secretariat Tab
const SecretariatTab = ({ data, headers, onRefresh }) => (
  <CrudTab
    title="Secretariat"
    data={data}
    headers={headers}
    endpoint="/admin/secretariat"
    onRefresh={onRefresh}
    fields={[
      { name: 'name', label: 'Name' },
      { name: 'role', label: 'Role' },
      { name: 'experience', label: 'Experience', type: 'textarea' },
      { name: 'photo_url', label: 'Photo URL', default: '/placeholder-member.jpg' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
    ]}
  />
);

// Speakers Tab
const SpeakersTab = ({ data, headers, onRefresh }) => (
  <CrudTab
    title="Guest Speakers"
    data={data}
    headers={headers}
    endpoint="/admin/speakers"
    onRefresh={onRefresh}
    fields={[
      { name: 'name', label: 'Name' },
      { name: 'title', label: 'Title/Position' },
      { name: 'experience', label: 'Experience', type: 'textarea' },
      { name: 'photo_url', label: 'Photo URL', default: '/placeholder-speaker.jpg' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
    ]}
  />
);

// Media Tab
const MediaTab = ({ data, headers, onRefresh }) => {
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({ url: '', caption: '', date: '', order: 0 });

  const handleSave = async () => {
    try {
      await axios.post(`${API}/admin/media`, formData, { headers });
      setCreating(false);
      setFormData({ url: '', caption: '', date: '', order: 0 });
      onRefresh();
    } catch (e) {
      console.error('Error saving:', e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await axios.delete(`${API}/admin/media/${id}`, { headers });
      onRefresh();
    } catch (e) {
      console.error('Error deleting:', e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl">Media ({data.length})</h2>
        <button onClick={() => setCreating(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Photo
        </button>
      </div>

      {creating && (
        <div className="bg-surface border border-primary/30 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">Image URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full bg-surface-highlight border border-white/10 p-2 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-surface-highlight border border-white/10 p-2 text-white"
                placeholder="March 2025"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-text-muted mb-1">Caption</label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full bg-surface-highlight border border-white/10 p-2 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary">Save</button>
            <button onClick={() => setCreating(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((photo) => (
          <div key={photo.id} className="bg-surface border border-white/5 overflow-hidden group">
            <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url('${photo.url}')` }} />
            <div className="p-3">
              <p className="text-xs font-mono text-primary">{photo.date}</p>
              <p className="text-sm text-text-muted truncate">{photo.caption}</p>
              <button
                onClick={() => handleDelete(photo.id)}
                className="mt-2 text-red-400 hover:text-red-300 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab = ({ data, headers, onRefresh }) => {
  const [formData, setFormData] = useState(data || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/settings`, formData, { headers });
      onRefresh();
    } catch (e) {
      console.error('Error saving settings:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Site Settings</h2>

      <div className="bg-surface border border-white/5 p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-text-muted mb-2">Registration Fee</label>
            <input
              type="text"
              value={formData.registration_fee || ''}
              onChange={(e) => setFormData({ ...formData, registration_fee: e.target.value })}
              className="input-minimal"
            />
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.registration_open || false}
                onChange={(e) => setFormData({ ...formData, registration_open: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
              <span>Registration Open (Global)</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">Conference Date</label>
            <input
              type="text"
              value={formData.conference_date || ''}
              onChange={(e) => setFormData({ ...formData, conference_date: e.target.value })}
              className="input-minimal"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">Conference Location</label>
            <input
              type="text"
              value={formData.conference_location || ''}
              onChange={(e) => setFormData({ ...formData, conference_location: e.target.value })}
              className="input-minimal"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">Instagram URL</label>
            <input
              type="text"
              value={formData.instagram_url || ''}
              onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              className="input-minimal"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">About Description</label>
            <textarea
              value={formData.about_description || ''}
              onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
              className="w-full bg-transparent border border-white/10 p-3 text-white resize-none h-32"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? <LoadingSpinner size="sm" /> : <Save size={16} />}
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Admin Page Component
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Verify token
      axios
        .get(`${API}/admin/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem('admin_token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPage;
