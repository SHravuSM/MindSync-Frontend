
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Enhanced user data with more sophisticated content
  const userData = {
    name: "Priya Sharma",
    title: "Innovation Catalyst & Technology Visionary",
    bio: "Passionate about transforming visionary ideas into groundbreaking solutions that shape tomorrow. Leading the intersection of sustainable technology and human-centered design.",
    location: "Mumbai, India",
    joinedDate: "March 2024",
    avatar: "/api/placeholder/120/120",
    coverImage: "/api/placeholder/1200/300",
    stats: {
      ideasShared: 127,
      collaborations: 23,
      followers: 892,
      following: 156
    },
    badges: [
      { name: "Visionary Pioneer", icon: "✨", color: "from-blue-500 to-indigo-600" },
      { name: "Collaboration Architect", icon: "🎯", color: "from-purple-500 to-pink-600" },
      { name: "Innovation Catalyst", icon: "🚀", color: "from-orange-500 to-red-600" }
    ],
    skills: ["Artificial Intelligence", "Sustainable Innovation", "Strategic Design", "Technology Leadership", "Systems Thinking", "Future Visioning"]
  };

  const recentIdeas = [
    {
      id: 1,
      title: "Neural-Powered Climate Intelligence Platform",
      description: "Revolutionary AI system that predicts and mitigates environmental challenges through quantum-enhanced data processing and global sensor networks.",
      likes: 245,
      comments: 67,
      collaborators: 12,
      date: "2 days ago",
      tags: ["Climate Tech", "Neural Networks", "Quantum AI"],
      impact: "High",
      status: "In Development"
    },
    {
      id: 2,
      title: "Immersive Learning Ecosystem for Global Education",
      description: "Next-generation educational platform leveraging AR/VR technologies to democratize world-class learning experiences across emerging markets.",
      likes: 178,
      comments: 43,
      collaborators: 8,
      date: "5 days ago",
      tags: ["EdTech", "AR/VR", "Social Impact"],
      impact: "Medium",
      status: "Prototype"
    },
    {
      id: 3,
      title: "Blockchain-Native Supply Chain Revolution",
      description: "Transparent, sustainable supply chain infrastructure built on advanced blockchain architecture with real-time impact verification.",
      likes: 198,
      comments: 52,
      collaborators: 15,
      date: "1 week ago",
      tags: ["Blockchain", "Sustainability", "Supply Chain"],
      impact: "High",
      status: "Funded"
    }
  ];

  const collaborations = [
    {
      id: 1,
      title: "EcoTech Solutions Consortium",
      role: "Founding Visionary",
      status: "Active",
      members: 24,
      description: "Building the next generation of sustainable technology solutions through collaborative innovation and strategic partnerships.",
      funding: "$2.3M",
      stage: "Series A"
    },
    {
      id: 2,
      title: "AI for Humanity Initiative",
      role: "Technical Strategist",
      status: "Scaling",
      members: 45,
      description: "Global initiative developing ethical AI frameworks and tools for social impact organizations worldwide.",
      funding: "Grant-funded",
      stage: "Implementation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 font-sans">
      {/* Elegant Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link 
              to="/dashboard" 
              className="group flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-medium text-lg">Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
              >
                {isEditing ? "✓ Save Changes" : "✏️ Edit Profile"}
              </button>
              
              <div className="relative group">
                <button className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sophisticated Profile Header */}
      <div className="relative overflow-hidden">
        {/* Elegant Cover Section */}
        <div className="h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-purple-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Elegant Brand Element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-3 tracking-wide">
                Mano<span className="font-medium">Sangam</span>
                <span className="text-blue-400 text-4xl sm:text-5xl lg:text-6xl">.</span>
              </h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-3"></div>
              <p className="text-base sm:text-lg opacity-80 font-light italic">Innovation Through Collaboration</p>
            </div>
          </div>
        </div>

        {/* Refined Profile Card */}
        <div className="max-w-7xl mx-auto px-6 relative -mt-24 sm:-mt-28">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Sophisticated Avatar Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl flex items-center justify-center text-white text-3xl sm:text-4xl font-light shadow-2xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Elegant Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">{userData.stats.ideasShared}</div>
                    <div className="text-xs text-gray-600 font-medium">Ideas Shared</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">{userData.stats.collaborations}</div>
                    <div className="text-xs text-gray-600 font-medium">Collaborations</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">{userData.stats.followers}</div>
                    <div className="text-xs text-gray-600 font-medium">Followers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">{userData.stats.following}</div>
                    <div className="text-xs text-gray-600 font-medium">Following</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Profile Information */}
              <div className="flex-1">
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-2 tracking-wide">
                    {userData.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-4 font-light">{userData.title}</p>
                  
                  {/* Location and Join Date */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">{userData.location}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z" />
                      </svg>
                      <span className="font-medium">Member since {userData.joinedDate}</span>
                    </span>
                  </div>

                  {/* Enhanced Bio */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl font-light">
                    {userData.bio}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium">
                      <span className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Connect</span>
                      </span>
                    </button>
                    <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-medium">
                      💬 Message
                    </button>
                    <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-medium">
                      📤 Share Profile
                    </button>
                  </div>
                </div>

                {/* Sophisticated Achievement Badges */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recognition & Achievements</h3>
                  <div className="flex flex-wrap gap-4">
                    {userData.badges.map((badge, index) => (
                      <div
                        key={index}
                        className={`group relative flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${badge.color} text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                      >
                        <span className="text-xl">{badge.icon}</span>
                        <span className="font-medium">{badge.name}</span>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Skills Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl text-sm font-medium hover:from-blue-50 hover:to-indigo-50 hover:text-blue-800 transition-all duration-300 border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: "🏠", description: "Dashboard & Activity" },
              { id: "ideas", label: "Innovation Portfolio", icon: "💡", description: "Ideas & Concepts" },
              { id: "collaborations", label: "Partnerships", icon: "🤝", description: "Active Projects" },
              { id: "achievements", label: "Milestones", icon: "🏆", description: "Recognition & Awards" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex flex-col items-center space-y-2 px-6 py-6 font-medium transition-all duration-500 whitespace-nowrap group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{tab.label}</div>
                    <div className="text-xs opacity-70">{tab.description}</div>
                  </div>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Tab Content */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pb-16">
        {/* Sophisticated Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Innovation Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-light text-gray-800 flex items-center">
                    <span className="mr-3 text-2xl">🚀</span>
                    Recent Innovation Activity
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
                </div>
                
                <div className="space-y-6">
                  {recentIdeas.slice(0, 3).map((idea) => (
                    <div key={idea.id} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{idea.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              idea.impact === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              {idea.impact} Impact
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">{idea.description}</p>
                        </div>
                        <span className="text-sm text-gray-500 ml-4">{idea.date}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {idea.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-xl font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                            <span className="font-medium">{idea.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="font-medium">{idea.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                            </svg>
                            <span className="font-medium">{idea.collaborators}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sophisticated Side Panel */}
            <div className="space-y-8">
              {/* Elite Connection Suggestions */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-light text-gray-800 mb-6 flex items-center">
                  <span className="mr-3 text-xl">✨</span>
                  Recommended Collaborators
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      name: "Dr. Arjun Krishnamurthy", 
                      role: "Quantum Computing Researcher", 
                      expertise: "AI & Quantum Systems",
                      mutual: 12,
                      university: "IIT Bombay"
                    },
                    { 
                      name: "Sarah Chen", 
                      role: "Sustainable Design Director", 
                      expertise: "Climate Solutions",
                      mutual: 8,
                      university: "Stanford Graduate"
                    },
                    { 
                      name: "Rajesh Kumar", 
                      role: "Venture Partner", 
                      expertise: "Deep Tech Investments",
                      mutual: 15,
                      university: "Harvard Business School"
                    }
                  ].map((person, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 text-sm mb-1">{person.name}</div>
                          <div className="text-xs text-gray-600 mb-1">{person.role}</div>
                          <div className="text-xs text-blue-600 font-medium mb-1">{person.expertise}</div>
                          <div className="text-xs text-gray-500">{person.university}</div>
                          <div className="text-xs text-purple-600 mt-2">{person.mutual} mutual connections</div>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
                          Connect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sophisticated Analytics */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-light text-gray-800 mb-6 flex items-center">
                  <span className="mr-3 text-xl">📊</span>
                  Innovation Metrics
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Monthly Ideas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                      </div>
                      <span className="font-bold text-blue-600">18</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Collaboration Success</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                      </div>
                      <span className="font-bold text-green-600">94%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Impact Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                      </div>
                      <span className="font-bold text-purple-600">8.7</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Community Influence</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                      </div>
                      <span className="font-bold text-orange-600">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Ideas Portfolio Tab */}
        {activeTab === "ideas" && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-light text-gray-800 flex items-center mb-2">
                  <span className="mr-4 text-3xl">💡</span>
                  Innovation Portfolio
                </h3>
                <p className="text-gray-600 font-light">A curated collection of transformative ideas ({recentIdeas.length} concepts)</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium">
                ✨ Create New Idea
              </button>
            </div>
            
            <div className="grid gap-8">
              {recentIdeas.map((idea) => (
                <div key={idea.id} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-2xl font-light text-gray-800 group-hover:text-blue-700 transition-colors">{idea.title}</h4>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          idea.status === "Funded" ? "bg-green-100 text-green-800" :
                          idea.status === "In Development" ? "bg-blue-100 text-blue-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          {idea.status}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          idea.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {idea.impact} Impact
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg font-light mb-6">{idea.description}</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-6">{idea.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-2xl font-medium border border-blue-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <span className="flex items-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="font-semibold">{idea.likes}</span>
                      </span>
                      <span className="flex items-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="font-semibold">{idea.comments}</span>
                      </span>
                      <span className="flex items-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                        </svg>
                        <span className="font-semibold">{idea.collaborators}</span>
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Collaborations Tab */}
        {activeTab === "collaborations" && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-light text-gray-800 flex items-center mb-2">
                  <span className="mr-4 text-3xl">🤝</span>
                  Strategic Partnerships
                </h3>
                <p className="text-gray-600 font-light">Active collaborations shaping the future ({collaborations.length} partnerships)</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium">
                🚀 Launch Partnership
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {collaborations.map((collab) => (
                <div key={collab.id} className="group p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-indigo-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-light text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors">{collab.title}</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full text-sm">{collab.role}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          collab.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {collab.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                          </svg>
                          <span className="font-medium">{collab.members} collaborators</span>
                        </span>
                        <span className="font-semibold text-green-600">{collab.funding}</span>
                        <span className="text-purple-600 font-medium">{collab.stage}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 font-light">{collab.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                      View Project Details →
                    </button>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
                        📊 Analytics
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
                        ⚙️ Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sophisticated Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-light text-gray-800 flex items-center mb-2">
                <span className="mr-4 text-3xl">🏆</span>
                Recognition & Milestones
              </h3>
              <p className="text-gray-600 font-light">A testament to innovation excellence and community impact</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "Visionary Founder", 
                  description: "Launched first breakthrough innovation on ManoSangam", 
                  icon: "🌟", 
                  date: "March 2024", 
                  rarity: "Legendary",
                  gradient: "from-yellow-400 to-orange-500" 
                },
                { 
                  title: "Collaboration Architect", 
                  description: "Orchestrated 25+ successful multi-disciplinary partnerships", 
                  icon: "🏗️", 
                  date: "April 2024", 
                  rarity: "Epic",
                  gradient: "from-purple-500 to-indigo-600" 
                },
                { 
                  title: "Innovation Catalyst", 
                  description: "Generated 100+ transformative ideas with measurable impact", 
                  icon: "⚡", 
                  date: "May 2024", 
                  rarity: "Legendary",
                  gradient: "from-blue-500 to-cyan-500" 
                },
                { 
                  title: "Community Champion", 
                  description: "Received 1000+ community endorsements for contributions", 
                  icon: "👑", 
                  date: "June 2024", 
                  rarity: "Rare",
                  gradient: "from-pink-500 to-red-500" 
                },
                { 
                  title: "Thought Leader", 
                  description: "Mentored 50+ emerging innovators to success", 
                  icon: "🧠", 
                  date: "July 2024", 
                  rarity: "Epic",
                  gradient: "from-emerald-500 to-teal-500" 
                },
                { 
                  title: "Global Influencer", 
                  description: "Ideas featured in top 1% globally for impact potential", 
                  icon: "🌍", 
                  date: "August 2024", 
                  rarity: "Mythic",
                  gradient: "from-violet-500 to-purple-600" 
                }
              ].map((achievement, index) => (
                <div key={index} className={`group relative p-8 bg-gradient-to-br ${achievement.gradient} rounded-3xl text-white hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mt-12"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full -ml-8 -mb-8"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-5xl">{achievement.icon}</div>
                      <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {achievement.rarity}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{achievement.title}</h4>
                    <p className="text-white/90 leading-relaxed mb-4 font-light">{achievement.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {achievement.date}
                      </span>
                      <button className="text-white hover:text-white/80 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}