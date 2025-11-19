import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Target,
  Users,
  PlayCircle,
  FileText,
  HelpCircle,
  Lock,
  CheckCircle,
  Star,
  Calculator,
  Book,
  ArrowRight
} from 'lucide-react';
import SidebarNav from "./SidebarNav";

const learningData = {
  userProgress: {
    level: 1,
    levelName: "Saver",
    levelProgress: 40, // percentage
    points: 1250,
    recentAchievements: [
      { id: 1, title: "First Savings", icon: <Star size={24} className="text-yellow-500" /> },
      { id: 2, title: "Budget Beginner", icon: <Award size={24} className="text-blue-500" /> },
    ]
  },
  levels: [
    { id: 1, name: "Saver", description: "Budgeting, saving, mobile money safety.", icon: <CheckCircle size={24} className="text-green-500"/>, status: 'completed' },
    { id:2, name: "Smart Spender", description: "Loan options, avoiding debt, negotiating.", icon: <BookOpen size={24} className="text-indigo-500"/>, status: 'unlocked' },
    { id: 3, name: "Investor", description: "SACCOs, unit trusts, government bonds.", icon: <Lock size={24} className="text-gray-400"/>, status: 'locked' },
    { id: 4, name: "Entrepreneur", description: "Business planning, accounting, marketing.", icon: <Lock size={24} className="text-gray-400"/>, status: 'locked' },
    { id: 5, name: "Wealth Builder", description: "Property, insurance, retirement.", icon: <Lock size={24} className="text-gray-400"/>, status: 'locked' },
  ],
  currentLevelLessons: [
    { id: 1, title: "Intro to Budgeting", type: "video", duration: "5 min", completed: true },
    { id: 2, title: "Setting Savings Goals", type: "article", duration: "10 min read", completed: true },
    { id: 3, title: "Understanding Mobile Money", type: "video", duration: "7 min", completed: false },
    { id: 4, title: "Budgeting Quiz", type: "quiz", duration: "10 questions", completed: false },
  ],
  challenges: [
      { id: 1, title: "Weekly Savings Streak", description: "Save at least 500 KES this week.", type: "individual", progress: 60 },
      { id: 2, title: "Chama Education Challenge", description: "Your Chama completes the 'Saver' level.", type: "group", progress: 25 },
  ]
};

const LevelCard = ({ level }) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';
    const isUnlocked = level.status === 'unlocked';

    let cardClasses = "bg-white/70 p-6 rounded-xl shadow-pink-300/60 transition-all backdrop-blur-md border border-pink-100 ";
    if (isLocked) cardClasses += "opacity-60";
    if (isUnlocked) cardClasses += "border-2 border-indigo-500 ring-4 ring-indigo-100";
    if (isCompleted) cardClasses += "bg-green-50";

    return (
        <div className={cardClasses}>
            <div className="flex items-center justify-between">
                <h3 className={`font-bold text-lg ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>Level {level.id}: {level.name}</h3>
                {level.icon}
            </div>
            <p className="text-sm text-gray-600 mt-2">{level.description}</p>
            {isUnlocked && (
                 <button className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Continue Learning
                </button>
            )}
        </div>
    );
}

const LessonItem = ({ lesson }) => {
    const getIcon = (type) => {
        switch(type) {
            case 'video': return <PlayCircle className="text-red-500" />;
            case 'article': return <FileText className="text-blue-500" />;
            case 'quiz': return <HelpCircle className="text-green-500" />;
            default: return <BookOpen />;
        }
    }
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-4">
                {getIcon(lesson.type)}
                <div>
                    <p className="font-medium text-gray-800">{lesson.title}</p>
                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                </div>
            </div>
            {lesson.completed ? (
                <CheckCircle className="text-green-500" />
            ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
            )}
        </div>
    );
}

const FinancialLiteracy = () => {
  const navigate = useNavigate();
  const { userProgress, levels, currentLevelLessons, challenges } = learningData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 font-sans backdrop-blur-lg flex">
            <SidebarNav />
            <div className="flex-1 pl-20">
        {/* Header */}
        <div className="bg-white/70 shadow-pink-300/40 p-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md border border-pink-100">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="text-indigo-600 mr-3"/>
              Mama Pesa's Learning Hub
          </h1>
          <button onClick={() => navigate('/main')} className="text-gray-600 hover:text-indigo-600">
            Back to Dashboard
          </button>
        </div>

        <main className="p-4 md:p-8">
          {/* User Progress Dashboard */}
          <section className="bg-gradient-to-r from-pink-400 via-cornsilk to-pink-300 text-pink-900 p-6 rounded-xl shadow-pink-300/60 mb-8 backdrop-blur-md border border-pink-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                      <p className="text-sm opacity-80">Current Level</p>
                      <h2 className="text-3xl font-bold">Level {userProgress.level}: {userProgress.levelName}</h2>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                      <p className="text-sm opacity-80">Total Points</p>
                      <p className="text-2xl font-bold">{userProgress.points.toLocaleString()} XP</p>
                  </div>
              </div>
              <div className="mt-4">
                  <div className="flex justify-between mb-1 text-sm">
                      <span>Level Progress</span>
                      <span>{userProgress.levelProgress}%</span>
                  </div>
                  <div className="w-full bg-indigo-400 rounded-full h-2.5">
                      <div className="bg-white h-2.5 rounded-full" style={{ width: `${userProgress.levelProgress}%` }}></div>
                  </div>
              </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content: Levels & Lessons */}
              <div className="lg:col-span-2 space-y-8">
                  {/* Level Progression */}
                  <section>
                      <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Learning Journey</h2>
                      <div className="space-y-4">
                          {levels.map(level => <LevelCard key={level.id} level={level} />)}
                      </div>
                  </section>

                  {/* Current Lessons */}
                  <section>
                      <h2 className="text-xl font-semibold text-gray-700 mb-4">Lessons in {levels.find(l => l.status === 'unlocked')?.name}</h2>
                      <div className="bg-white/70 p-6 rounded-xl shadow-pink-300/60 space-y-4 backdrop-blur-md border border-pink-100">
                          {currentLevelLessons.map(lesson => <LessonItem key={lesson.id} lesson={lesson} />)}
                      </div>
                  </section>
              </div>

              {/* Right Sidebar: Challenges, Achievements, Resources */}
              <div className="space-y-8">
                  {/* Challenges & Competitions */}
                  <section className="bg-white/70 p-6 rounded-xl shadow-pink-300/60 backdrop-blur-md border border-pink-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Target className="text-red-500 mr-2"/> Challenges</h3>
                      <div className="space-y-4">
                          {challenges.map(challenge => (
                              <div key={challenge.id}>
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium text-gray-700 flex items-center">
                                          {challenge.type === 'group' ? <Users size={14} className="mr-1.5"/> : <Star size={14} className="mr-1.5"/>}
                                          {challenge.title}
                                      </span>
                                      <span className="text-sm font-medium text-gray-500">{challenge.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <button className="mt-6 w-full text-sm text-indigo-600 font-semibold hover:underline">View All Challenges & Leaderboards</button>
                  </section>

                  {/* Achievement Gallery */}
                  <section className="bg-white/70 p-6 rounded-xl shadow-pink-300/60 backdrop-blur-md border border-pink-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
                      <div className="flex justify-around">
                          {userProgress.recentAchievements.map(ach => (
                              <div key={ach.id} className="flex flex-col items-center text-center">
                                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
                                      {ach.icon}
                                  </div>
                                  <p className="text-xs mt-2 font-medium text-gray-600">{ach.title}</p>
                              </div>
                          ))}
                      </div>
                      <button className="mt-6 w-full text-sm text-indigo-600 font-semibold hover:underline">View Your Achievement Gallery</button>
                  </section>

                  {/* Resource Hub */}
                  <section className="bg-white/70 p-6 rounded-xl shadow-pink-300/60 backdrop-blur-md border border-pink-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Resource Hub</h3>
                      <div className="space-y-3">
                          <button className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                              <div className="flex items-center gap-3">
                                  <Calculator size={20} className="text-indigo-600"/>
                                  <span className="font-medium text-sm">Financial Calculators</span>
                              </div>
                              <ArrowRight size={16} className="text-gray-400"/>
                          </a>
                          <button className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                              <div className="flex items-center gap-3">
                                  <Book size={20} className="text-indigo-600"/>
                                  <span className="font-medium text-sm">Glossary of Terms</span>
                              </div>
                              <ArrowRight size={16} className="text-gray-400"/>
                          </a>
                      </div>
                  </section>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialLiteracy;