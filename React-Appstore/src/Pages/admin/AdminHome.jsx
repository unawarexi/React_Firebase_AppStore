/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PieChart, 
  LineChart, 
  BarChart,
  ResponsiveContainer,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Pie,
  Cell,
  Bar
} from "recharts";
import { 
  Download,
  TrendingUp, 
  FileText,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Mock data
const revenueData = [
  { name: 'Jan', android: 4000, ios: 2400 },
  { name: 'Feb', android: 3000, ios: 1398 },
  { name: 'Mar', android: 2000, ios: 9800 },
  { name: 'Apr', android: 2780, ios: 3908 },
  { name: 'May', android: 1890, ios: 4800 },
  { name: 'Jun', android: 2390, ios: 3800 },
  { name: 'Jul', android: 3490, ios: 4300 },
];

const downloadData = [
  { name: 'Jan', android: 20000, ios: 12000 },
  { name: 'Feb', android: 15000, ios: 13980 },
  { name: 'Mar', android: 18000, ios: 28000 },
  { name: 'Apr', android: 27800, ios: 19080 },
  { name: 'May', android: 18900, ios: 24800 },
  { name: 'Jun', android: 23900, ios: 38000 },
  { name: 'Jul', android: 34900, ios: 43000 },
];

const categoryData = [
  { name: 'Games', value: 4000 },
  { name: 'Social', value: 3000 },
  { name: 'Productivity', value: 2000 },
  { name: 'Entertainment', value: 2780 },
  { name: 'Education', value: 1890 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const topApps = [
  { id: 1, name: "Instagram", category: "Social", downloads: "2.4M", revenue: "$1.2M", platform: "both" },
  { id: 2, name: "Clash of Clans", category: "Games", downloads: "1.8M", revenue: "$980K", platform: "both" },
  { id: 3, name: "Spotify", category: "Music", downloads: "1.5M", revenue: "$850K", platform: "both" },
  { id: 4, name: "Snapchat", category: "Social", downloads: "1.2M", revenue: "$720K", platform: "both" },
  { id: 5, name: "Zoom", category: "Productivity", downloads: "1.1M", revenue: "$650K", platform: "both" },
];

const notifications = [
  { id: 1, title: "New app submission", message: "Developer XYZ submitted a new app", time: "5 min ago", type: "new" },
  { id: 2, title: "Revenue alert", message: "10% increase in daily revenue", time: "2 hours ago", type: "alert" },
  { id: 3, title: "App approved", message: "Gaming app 'SuperDash' has been approved", time: "3 hours ago", type: "approved" },
  { id: 4, title: "Report ready", message: "Monthly report is ready to download", time: "Yesterday", type: "report" },
];

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Filter top apps based on platform selection
  const filteredApps = topApps.filter(app => {
    if (selectedPlatform === "all") return true;
    if (selectedPlatform === "android" && app.platform === "android") return true;
    if (selectedPlatform === "ios" && app.platform === "ios") return true;
    if (selectedPlatform === "both" && app.platform === "both") return true;
    return false;
  });

  return (
    <main className="w-full min-h-screen bg-white dark:bg-gray-900 mt-10">
      <div className="w-full px-4 md:px-20">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 w-full px-4 md:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <select 
                    className="border border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200"
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    value={selectedPlatform}
                  >
                    <option value="all">All Platforms</option>
                    <option value="android">Android</option>
                    <option value="ios">iOS</option>
                    <option value="both">Cross-Platform</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow">
                    <Download size={16} className="mr-2" />
                    Export Report
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 md:px-8 w-full">
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Total Revenue</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      12%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$1,458,213</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-xs mt-1">Compared to $1,257,985 last month</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Total Downloads</span>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      8.5%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24.3M</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-xs mt-1">Compared to 22.4M last month</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">New Apps</span>
                    <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      5.2%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,248</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-xs mt-1">Compared to 1,186 last month</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Active Users</span>
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      15.8%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8.6M</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-xs mt-1">Compared to 7.4M last month</p>
                </motion.div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 px-4 md:px-8 w-full">
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm lg:col-span-2 w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
                    <div className="flex items-center text-xs">
                      <span className="flex items-center mr-4">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                        <span className="text-gray-700 dark:text-gray-300">Android</span>
                      </span>
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                        <span className="text-gray-700 dark:text-gray-300">iOS</span>
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#111827" }} />
                      <Line type="monotone" dataKey="android" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="ios" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full"
                >
                  <h3 className="font-medium mb-4 text-gray-900 dark:text-white">App Categories</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#111827" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
              
              {/* Downloads Chart */}
              <motion.div 
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 w-full px-4 md:px-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Download Trends</h3>
                  <div className="flex items-center text-xs">
                    <span className="flex items-center mr-4">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                      <span className="text-gray-700 dark:text-gray-300">Android</span>
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-gray-700 dark:text-gray-300">iOS</span>
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={downloadData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#111827" }} />
                    <Bar dataKey="android" fill="#3B82F6" />
                    <Bar dataKey="ios" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
              
              {/* Top Apps */}
              <motion.div 
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full px-4 md:px-8"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">Top Performing Apps</h3>
                  <select 
                    className="border border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 md:mt-0 text-gray-900 dark:text-gray-200"
                    onChange={(e) => setFilterCategory(e.target.value)}
                    value={filterCategory}
                  >
                    <option value="all">All Categories</option>
                    <option value="Games">Games</option>
                    <option value="Social">Social</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-700 dark:text-gray-300 text-sm border-b border-gray-300 dark:border-gray-700">
                        <th className="pb-3 font-medium">App Name</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Downloads</th>
                        <th className="pb-3 font-medium">Revenue</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map(app => (
                        <tr key={app.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium mr-3">
                                {app.name.charAt(0)}
                              </div>
                              <span className="text-gray-900 dark:text-white">{app.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-700 dark:text-gray-300">{app.category}</td>
                          <td className="py-4 text-gray-700 dark:text-gray-300">{app.downloads}</td>
                          <td className="py-4 text-gray-700 dark:text-gray-300">{app.revenue}</td>
                          <td className="py-4">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">View All Apps</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}