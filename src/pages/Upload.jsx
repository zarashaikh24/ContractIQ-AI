import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload as UploadIcon,
  FileText,
  Sparkles,
  ArrowLeft,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { demoContract } from '../utils/demoContract';

const Upload = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // upload, paste, demo
  const [file, setFile] = useState(null);
  const [contractText, setContractText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleDemoLoad = () => {
    setActiveTab('demo');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear textarea when switching away from demo
    if (tab !== 'demo' && activeTab === 'demo') {
      setContractText('');
    }
  };

  const handleAnalyze = () => {
    // Validate input
    if (activeTab === 'upload' && !file) {
      alert('Please upload a PDF file');
      return;
    }
    if (activeTab === 'paste' && !contractText.trim()) {
      alert('Please paste or enter contract text');
      return;
    }
    if (activeTab === 'demo') {
      // Demo tab - use demo contract
    }

    // Show loading animation
    setIsAnalyzing(true);

    // Prepare contract data
    let textToAnalyze = contractText;
    let fileNameToUse = 'Demo Contract';

    if (activeTab === 'upload' && file) {
      // For PDF uploads, use demo contract as placeholder
      // In production, this would extract text from PDF
      textToAnalyze = demoContract;
      fileNameToUse = file.name;
    } else if (activeTab === 'paste') {
      fileNameToUse = 'Pasted Contract';
    } else if (activeTab === 'demo') {
      textToAnalyze = demoContract;
      fileNameToUse = 'Demo Contract';
    }

    // Simulate API call and navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard', {
        state: {
          contractText: textToAnalyze,
          fileName: fileNameToUse
        }
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="container-custom py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-ibm-blue" />
              <span className="text-sm font-medium text-dark-200">
                AI-Powered Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your <span className="gradient-text">Contract</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Upload a legal contract and let AI analyze risks, obligations, and hidden clauses.
            </p>
          </motion.div>

          {/* Upload Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => handleTabChange('upload')}
                className={`flex-1 min-w-[150px] px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-ibm-blue text-white shadow-lg'
                    : 'bg-white/5 text-dark-300 hover:bg-white/10'
                }`}
              >
                <UploadIcon className="w-5 h-5 inline-block mr-2" />
                Upload PDF
              </button>
              <button
                onClick={() => handleTabChange('paste')}
                className={`flex-1 min-w-[150px] px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'paste'
                    ? 'bg-ibm-blue text-white shadow-lg'
                    : 'bg-white/5 text-dark-300 hover:bg-white/10'
                }`}
              >
                <FileText className="w-5 h-5 inline-block mr-2" />
                Paste Text
              </button>
              <div className="flex-1 min-w-[150px] relative group">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs text-ibm-blue font-semibold">
                    ✨ Recommended for First-Time Users
                  </span>
                </div>
                <button
                  onClick={handleDemoLoad}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                    activeTab === 'demo'
                      ? 'bg-ibm-blue text-white shadow-lg'
                      : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:scale-105'
                  }`}
                  title="Instantly test ContractIQ AI using a realistic sample agreement"
                >
                  <Sparkles className="w-5 h-5 inline-block mr-2" />
                  <span>Try AI Demo</span>
                </button>
                <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-dark-400">
                    Instant demo • No upload needed
                  </span>
                </div>
              </div>
            </div>

            {/* Upload PDF Section */}
            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-ibm-blue/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer block"
                  >
                    <div className="w-16 h-16 bg-ibm-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UploadIcon className="w-8 h-8 text-ibm-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Click to upload PDF
                    </h3>
                    <p className="text-dark-400 mb-4">
                      or drag and drop your contract file here
                    </p>
                    <p className="text-sm text-dark-500">
                      Supports: PDF files up to 10MB
                    </p>
                  </label>
                </div>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ibm-blue/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-ibm-blue" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-sm text-dark-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    {uploadSuccess && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Paste Text Section */}
            {activeTab === 'paste' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Paste your contract text here..."
                  className="w-full h-96 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent transition-all duration-300 resize-none custom-scrollbar"
                />
                <p className="text-sm text-dark-400">
                  {contractText.length} characters • {contractText.split(/\s+/).filter(w => w).length} words
                </p>
              </motion.div>
            )}

            {/* Demo Section */}
            {activeTab === 'demo' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-ibm-blue/10 to-purple-500/10 border border-ibm-blue/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-ibm-blue" />
                    <h3 className="text-xl font-bold text-white">Demo Contract Ready</h3>
                  </div>
                  <p className="text-dark-200 mb-4">
                    We've prepared a realistic sample service agreement for you to test ContractIQ AI's analysis capabilities.
                  </p>
                  <div className="bg-dark-900/50 rounded-lg p-4 max-h-64 overflow-y-auto custom-scrollbar">
                    <pre className="text-sm text-dark-300 whitespace-pre-wrap font-mono">
                      {demoContract.substring(0, 500)}...
                    </pre>
                  </div>
                  <div className="mt-4 flex items-center space-x-2 text-sm text-dark-400">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Sample contract loaded and ready for analysis</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Analyze Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI analyzing your contract...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Contract</span>
                </>
              )}
            </button>
            <p className="text-sm text-dark-400 mt-4">
              Analysis typically takes 3-5 seconds
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

// Made with Bob
