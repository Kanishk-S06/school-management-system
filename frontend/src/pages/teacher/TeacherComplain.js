import React, { useState } from 'react';
import { Send, Message } from '@mui/icons-material';

const TeacherComplain = () => {
    const [formData, setFormData] = useState({
        category: '',
        subject: '',
        description: '',
        priority: 'medium'
    });
    const [loader, setLoader] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoader(false);
            alert('Complaint submitted successfully!');
            setFormData({
                category: '',
                subject: '',
                description: '',
                priority: 'medium'
            });
        }, 2000);
    };

    const categories = [
        'Student Behavior',
        'Academic Issues',
        'Facility Problems',
        'Administrative Issues',
        'Technical Support',
        'Other'
    ];

    const priorities = [
        { value: 'low', label: 'Low Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'high', label: 'High Priority' },
        { value: 'urgent', label: 'Urgent' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25">
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <Message className="w-16 h-16 text-purple-400 animate-bounce" />
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-2">
                            Submit a Complaint
                        </h1>
                        <p className="text-xl text-gray-300 font-medium">
                            Report issues, concerns, or feedback to administration
                        </p>
                    </div>

                    {/* Form */}
                    <div onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Category Selection */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-300">
                                Complaint Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/10"
                            >
                                <option value="" className="bg-gray-800 text-white">Select a category...</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category} className="bg-gray-800 text-white">
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Priority Selection */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-300">
                                Priority Level
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/10"
                            >
                                {priorities.map((priority, index) => (
                                    <option key={index} value={priority.value} className="bg-gray-800 text-white">
                                        {priority.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-300">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                placeholder="Brief subject of your complaint"
                                required
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/10"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-300">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Provide detailed information about your complaint..."
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/10 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loader}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                        >
                            {loader ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send style={{ fontSize: 20 }} />
                                    Submit Complaint
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherComplain;