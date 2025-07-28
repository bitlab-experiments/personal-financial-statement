"use client"
import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PlusCircle, MinusCircle, Edit2, Trash2, Plus, Save, X, Percent } from 'lucide-react';

export default function RichDadFinancialStatement() {
  const [assets, setAssets] = useState([] as any);

  const [liabilities, setLiabilities] = useState([] as any);

  const [incomes, setIncomes] = useState([] as any);

  const [expenses, setExpenses] = useState([] as any);

  const [editingAsset, setEditingAsset] = useState(null);
  const [editingLiability, setEditingLiability] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showAddLiability, setShowAddLiability] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [currencySelect, setCurrencySelect] = useState('USD:en-US');
  const [currency, setCurrency] = useState('USD');
  const [locale, setLocale] = useState('en-US');
  const supportedCurrencies = [
    { code: 'CNY', locale: 'zh-HK', label: 'Chinese Yuan Renminbi' },
    { code: 'EUR', locale: 'en-US', label: 'Euro' },
    { code: 'JPY', locale: 'ja-JP', label: 'Japanese Yen' },
    { code: 'TWD', locale: 'en-US', label: 'New Taiwan Dollar' },
    { code: 'GBP', locale: 'en-GB', label: 'Pound Sterling' },
    { code: 'RUB', locale: 'ru-RU', label: 'Russian Ruble' },
    { code: 'CHF', locale: 'gsw',   label: 'Swiss Franc' },
    { code: 'THB', locale: 'th-TH', label: 'Thai Baht' },
    { code: 'USD', locale: 'en-US', label: 'US Dollar' },
    { code: 'VND', locale: 'vi-VN', label: 'Vietnamese Dong' },
    // Add more as needed
  ];

  const calculateLiabilitiesToAssets = (l: number, a: number) => {
    const result = l / a;
    if (isNaN(result)) return 0;
    return result;
  }

  const calculatePassiveIncomeToExpenseRate = (pi: number, e: number) => {
    const result = pi / e;
    if (isNaN(result)) return 0;
    return result;
  }

  const calculateExpensesToIncome = (e: number, i: number) => {
    const result = e / i;
    if (isNaN(result)) return 0;
    return result;
  }

  const totalAssetValue = assets.reduce((sum: any, asset: any) => sum + asset.value, 0);
  const totalLiabilityValue = liabilities.reduce((sum: any, liability: { value: any; }) => sum + liability.value, 0);
  const netWorth = totalAssetValue - totalLiabilityValue;
  
  const totalIncome = incomes.reduce((sum: any, income: { amount: any; }) => sum + income.amount, 0);
  const totalPassiveIncome = assets.reduce((sum: any, asset: { monthlyIncome: any; }) => sum + asset.monthlyIncome, 0);
  const totalLiabilityPayments = liabilities.reduce((sum: any, liability: { monthlyPayment: any; }) => sum + liability.monthlyPayment, 0);
  const totalExpenses = expenses.reduce((sum: any, expense: { amount: any; }) => sum + expense.amount, 0);
  const netCashFlow = totalIncome + totalPassiveIncome - totalLiabilityPayments - totalExpenses;

  const liabilitiesToAssets = calculateLiabilitiesToAssets(totalLiabilityValue, totalAssetValue);
  const passiveIncomeToExpenseRate = calculatePassiveIncomeToExpenseRate(totalPassiveIncome, totalExpenses + totalLiabilityPayments);
  const expensesToIncome = calculateExpensesToIncome(totalLiabilityPayments + totalExpenses, totalIncome + totalPassiveIncome);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (pc: number) => {
    if (!isNaN(pc)) {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 2
      }).format(pc);  
    }
    return 0;
  }

  const onCurrencyChange = (value: string) => {
    setCurrencySelect(value);
    console.log(value);
    const [code, locale] = value.split(':');
    setCurrency(code);
    setLocale(locale);
  }

  // Asset functions
  const addAsset = (asset: any) => {
    const newAsset = { ...asset, id: Date.now() };
    setAssets([...assets, newAsset]);
    setShowAddAsset(false);
  };

  const updateAsset = (id: number, updatedAsset: any) => {
    setAssets(assets.map((asset: { id: number; }) => asset.id === id ? { ...updatedAsset, id } : asset));
    setEditingAsset(null);
  };

  const deleteAsset = (id: number) => {
    setAssets(assets.filter((asset: { id: number; }) => asset.id !== id));
  };

  // Liability functions
  const addLiability = (liability: any) => {
    const newLiability = { ...liability, id: Date.now() };
    setLiabilities([...liabilities, newLiability]);
    setShowAddLiability(false);
  };

  const updateLiability = (id: number, updatedLiability: any) => {
    setLiabilities(liabilities.map((liability: { id: number; }) => liability.id === id ? { ...updatedLiability, id } : liability));
    setEditingLiability(null);
  };

  const deleteLiability = (id: number) => {
    setLiabilities(liabilities.filter((liability: { id: number; }) => liability.id !== id));
  };

  // Income functions
  const addIncome = (income: any) => {
    const newIncome = { ...income, id: Date.now() };
    setIncomes([...incomes, newIncome]);
    setShowAddIncome(false);
  }

  const updateIncome = (id: number, updatedIncome: any) => {
    setIncomes(incomes.map((income: { id: number; }) => income.id === id ? { ...updatedIncome, id } : income));
    setEditingIncome(null);
  };

  const deleteIncome = (id: number) => {
    setIncomes(incomes.filter((income: { id: number; }) => income.id !== id));
  };  

  // Expense functions
  const addExpense = (expense: any) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses([...expenses, newExpense]);
    setShowAddExpense(false);
  };

  const updateExpense = (id: number, updatedExpense: any) => {
    setExpenses(expenses.map((expense: { id: number; }) => expense.id === id ? { ...updatedExpense, id } : expense));
    setEditingExpense(null);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense: { id: number; }) => expense.id !== id));
  };

  // Form components
  const AssetForm = ({ asset, onSave, onCancel }) => {
    const [formData, setFormData] = useState(asset || { name: '', value: '', monthlyIncome: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onSave({ ...formData, value: Number(formData.value), monthlyIncome: Number(formData.monthlyIncome) });
    };

    return (
      <tr className="bg-emerald-50">
        <td colSpan="3" className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Asset name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Asset value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Monthly income"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center">
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  };

  const LiabilityForm = ({ liability, onSave, onCancel }) => {
    const [formData, setFormData] = useState(liability || { name: '', value: '', monthlyPayment: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onSave({ ...formData, value: Number(formData.value), monthlyPayment: Number(formData.monthlyPayment) });
    };

    return (
      <tr className="bg-red-50">
        <td colSpan="3" className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Liability name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Balance owed"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Monthly payment"
                value={formData.monthlyPayment}
                onChange={(e) => setFormData({ ...formData, monthlyPayment: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 flex items-center justify-center">
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  };

  const IncomeForm = ({ income, onSave, onCancel }) => {
    const [formData, setFormData] = useState(income || { name: '', amount: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onSave({ ...formData, amount: Number(formData.amount) });
    };

    return (
      <tr className="bg-orange-50">
        <td colSpan="2" className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Income name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Monthly amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 flex items-center justify-center">
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  const ExpenseForm = ({ expense, onSave, onCancel }) => {
    const [formData, setFormData] = useState(expense || { name: '', amount: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onSave({ ...formData, amount: Number(formData.amount) });
    };

    return (
      <tr className="bg-orange-50">
        <td colSpan="2" className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Expense name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Monthly amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 flex items-center justify-center">
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  };

  // Save data to file
  const saveToFile = () => {
    const data = {
      assets,
      liabilities,
      incomes,
      expenses,
      currency,
      locale,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-statement.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load data from file
  const loadFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setAssets(data.assets || []);
        setLiabilities(data.liabilities || []);
        setIncomes(data.incomes || []);
        setExpenses(data.expenses || []);
        setCurrencySelect(`${data.currency}:${data.locale}`);
        setCurrency(data.currency);
        setLocale(data.locale);
      } catch (err) {
        alert('Invalid file format!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rich Dad's Personal Financial Statement</h1>
          <p className="text-lg text-gray-600">Assets vs Liabilities - The Path to Financial Freedom</p>
        </div>

        {/* Currency Selector */}
        <div className="flex justify-center mb-4">
          <select
            value={currencySelect}
            onChange={e => onCurrencyChange(e.target.value)}
            className="p-2 border rounded-lg"
          >
            {supportedCurrencies.map(cur => (
              <option key={`${cur.code}:${cur.locale}`} value={`${cur.code}:${cur.locale}`}>{cur.label}</option>
            ))}
          </select>
        </div>

      {/* Save and Load Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={saveToFile}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save to File
        </button>
        <label className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
          Load from File
          <input
            type="file"
            accept="application/json"
            onChange={loadFromFile}
            className="hidden"
          />
        </label>
      </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Worth</p>
                <p className={`text-2xl font-bold ${netWorth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(netWorth)}
                </p>
              </div>
              {netWorth >= 0 ?
                <DollarSign className="h-8 w-8 text-emerald-500" /> :
                <DollarSign className="h-8 w-8 text-red-500" />
              }
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Passive Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalPassiveIncome)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                  {formatCurrency(netCashFlow)}
                </p>
              </div>
              {netCashFlow >= 0 ? 
                <TrendingUp className="h-8 w-8 text-purple-500" /> : 
                <TrendingDown className="h-8 w-8 text-red-500" />
              }
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Liabilities to Assets (should be &lt; 100%)</p>
                <p className={`text-2xl font-bold ${liabilitiesToAssets < 1 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatPercent(liabilitiesToAssets)}
                </p>
              </div>
              {liabilitiesToAssets < 1 ?
                <Percent className="h-8 w-8 text-emerald-500" /> :
                <Percent className="h-8 w-8 text-red-500" />
              }
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passive Income to Expenses (should be &ge; 100%)</p>
                <p className={`text-2xl font-bold ${passiveIncomeToExpenseRate >= 1 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatPercent(passiveIncomeToExpenseRate)}
                </p>
              </div>
              {passiveIncomeToExpenseRate >= 1 ?
                <Percent className="h-8 w-8 text-blue-500" /> :
                <Percent className="h-8 w-8 text-red-500" />
              }
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expenses to Income (should be &lt; 100%)</p>
                <p className={`text-2xl font-bold ${expensesToIncome < 1 ? 'text-purple-600' : 'text-red-600'}`}>
                  {formatPercent(expensesToIncome)}
                </p>
              </div>
              {expensesToIncome < 1 ? 
                <Percent className="h-8 w-8 text-purple-500" /> :
                <Percent className="h-8 w-8 text-red-500" />
              }
            </div>
          </div>
        </div>

        {/* Balance Sheet Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gray-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">Balance Sheet</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/2 p-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600 flex items-center">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Assets
                      </span>
                      <button
                        onClick={() => setShowAddAsset(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </button>
                    </div>
                  </th>
                  <th className="w-1/2 p-4 text-left border-l-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600 flex items-center">
                        <MinusCircle className="mr-2 h-5 w-5" />
                        Liabilities
                      </span>
                      <button
                        onClick={() => setShowAddLiability(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </button>
                    </div>
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    <div className="grid grid-cols-3 gap-2">
                      <span>Name</span>
                      <span className="text-center">Value</span>
                      <span className="text-center">Monthly Income</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700 border-l-2 border-gray-200">
                    <div className="grid grid-cols-3 gap-2">
                      <span>Name</span>
                      <span className="text-center">Balance</span>
                      <span className="text-center">Monthly Payment</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {showAddAsset && (
                  <tr>
                    <td className="p-0">
                      <AssetForm
                        onSave={addAsset}
                        onCancel={() => setShowAddAsset(false)} asset={undefined}                      />
                    </td>
                    <td className="border-l-2 border-gray-200"></td>
                  </tr>
                )}
                {showAddLiability && (
                  <tr>
                    <td className="border-r-2 border-gray-200"></td>
                    <td className="p-0">
                      <LiabilityForm
                        onSave={addLiability}
                        onCancel={() => setShowAddLiability(false)} liability={undefined}                      />
                    </td>
                  </tr>
                )}
                {Array.from({ length: Math.max(assets.length, liabilities.length) }).map((_, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    {/* Assets Column */}
                    <td className="p-3 border-r-2 border-gray-200">
                      {assets[index] && (
                        <>
                          {editingAsset === assets[index].id ? (
                            <AssetForm
                              asset={assets[index]}
                              onSave={(updatedAsset: any) => updateAsset(assets[index].id, updatedAsset)}
                              onCancel={() => setEditingAsset(null)}
                            />
                          ) : (
                            <div className="group">
                              <div className="grid grid-cols-3 gap-2 items-center">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-gray-800 text-sm">{assets[index].name}</span>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                                    <button
                                      onClick={() => setEditingAsset(assets[index].id)}
                                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => deleteAsset(assets[index].id)}
                                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <span className="text-center text-sm">{formatCurrency(assets[index].value)}</span>
                                <span className="text-center text-sm font-bold text-emerald-600">
                                  +{formatCurrency(assets[index].monthlyIncome)}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    
                    {/* Liabilities Column */}
                    <td className="p-3">
                      {liabilities[index] && (
                        <>
                          {editingLiability === liabilities[index].id ? (
                            <LiabilityForm
                              liability={liabilities[index]}
                              onSave={(updatedLiability: any) => updateLiability(liabilities[index].id, updatedLiability)}
                              onCancel={() => setEditingLiability(null)}
                            />
                          ) : (
                            <div className="group">
                              <div className="grid grid-cols-3 gap-2 items-center">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-gray-800 text-sm">{liabilities[index].name}</span>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                                    <button
                                      onClick={() => setEditingLiability(liabilities[index].id)}
                                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => deleteLiability(liabilities[index].id)}
                                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <span className="text-center text-sm">{formatCurrency(liabilities[index].value)}</span>
                                <span className="text-center text-sm font-bold text-red-600">
                                  -{formatCurrency(liabilities[index].monthlyPayment)}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                
                {/* Totals Row */}
                <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                  <td className="p-4 border-r-2 border-gray-200">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-emerald-700">Total Assets:</span>
                      <span className="text-center text-emerald-700">{formatCurrency(totalAssetValue)}</span>
                      <span className="text-center text-emerald-700">+{formatCurrency(totalPassiveIncome)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-red-700">Total Liabilities:</span>
                      <span className="text-center text-red-700">{formatCurrency(totalLiabilityValue)}</span>
                      <span className="text-center text-red-700">-{formatCurrency(totalLiabilityPayments)}</span>
                    </div>
                  </td>
                </tr>
                
                {/* Net Worth Row */}
                <tr className="bg-gray-200 font-bold">
                  <td colSpan="2" className="p-4 text-center">
                    <span className="text-lg">Net Worth: </span>
                    <span className={`text-xl ${netWorth >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                      {formatCurrency(netWorth)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Income Statement Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gray-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">Monthly Cash Flow Statement</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600 flex items-center">
                        Income Sources
                        <button
                          onClick={() => setShowAddIncome(true)}
                          className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </button>
                      </span>
                      <span className="text-lg font-bold text-emerald-600">+{formatCurrency(totalIncome + totalPassiveIncome)}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {showAddIncome && (
                  <IncomeForm
                    onSave={addIncome}
                    onCancel={() => setShowAddIncome(false)} income={undefined}                  />
                )}
                {assets.map((asset: { id: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; monthlyIncome: number; }) => (
                  <tr key={`income-${asset.id}`} className="border-t border-gray-100">
                    <td className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800">{asset.name} (Asset)</span>
                        <span className="font-bold text-emerald-600">+{formatCurrency(asset.monthlyIncome)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {incomes.map((income: any) => (
                  <tr key={`expense-${income.id}`} className="border-t border-gray-100">
                    <td className="p-3">
                      {editingIncome === income.id ? (
                        <IncomeForm
                          income={income}
                          onSave={(updatedIncome: any) => updateIncome(income.id, updatedIncome)}
                          onCancel={() => setEditingIncome(null)}
                        />
                      ) : (
                        <div className="flex justify-between items-center group">
                          <div className="flex items-center">
                            <span className="text-gray-800">{income.name}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                              <button
                                onClick={() => setEditingIncome(income.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteIncome(income.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <span className="font-bold text-lime-600">+{formatCurrency(income.amount)}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="border-t-2 border-gray-300">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600 flex items-center">
                        Expenses
                        <button
                          onClick={() => setShowAddExpense(true)}
                          className="ml-4 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </button>
                      </span>
                      <span className="text-lg font-bold text-red-600">-{formatCurrency(totalLiabilityPayments + totalExpenses)}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {showAddExpense && (
                  <ExpenseForm
                    onSave={addExpense}
                    onCancel={() => setShowAddExpense(false)} expense={undefined}                  />
                )}
                {liabilities.map((liability: { id: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; monthlyPayment: number; }) => (
                  <tr key={`expense-${liability.id}`} className="border-t border-gray-100">
                    <td className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800">{liability.name} (Liability)</span>
                        <span className="font-bold text-red-600">-{formatCurrency(liability.monthlyPayment)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {expenses.map((expense: any) => (
                  <tr key={`expense-${expense.id}`} className="border-t border-gray-100">
                    <td className="p-3">
                      {editingExpense === expense.id ? (
                        <ExpenseForm
                          expense={expense}
                          onSave={(updatedExpense: any) => updateExpense(expense.id, updatedExpense)}
                          onCancel={() => setEditingExpense(null)}
                        />
                      ) : (
                        <div className="flex justify-between items-center group">
                          <div className="flex items-center">
                            <span className="text-gray-800">{expense.name}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                              <button
                                onClick={() => setEditingExpense(expense.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <span className="font-bold text-orange-600">-{formatCurrency(expense.amount)}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                
                {/* Net Cash Flow Row */}
                <tr className="bg-gray-200 font-bold border-t-2 border-gray-300">
                  <td className="p-4">
                    <div className="flex justify-between items-center text-lg">
                      <span>Net Monthly Cash Flow:</span>
                      <span className={`text-xl ${netCashFlow >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {netCashFlow >= 0 ? '+' : ''}{formatCurrency(netCashFlow)}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Education Quote */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
          <blockquote className="text-lg italic mb-2">
            "The rich buy assets. The poor only have expenses. The middle class buy liabilities they think are assets."
          </blockquote>
          <p className="font-semibold">- Robert Kiyosaki, Rich Dad Poor Dad</p>
          <p className="text-sm mt-4 opacity-90">
            {netCashFlow >= 0 
              ? "🎉 Positive cash flow! You're on the path to financial freedom!" 
              : "⚠️ Negative cash flow. Focus on acquiring more income-producing assets."}
          </p>
        </div>
      </div>
    </div>
  );
}