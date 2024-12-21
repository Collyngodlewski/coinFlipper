'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function factorial(n: number): number {
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

function binomialCoefficient(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k))
}

function calculateProbability(n: number, k: number): number {
  const p = 0.5 // probability of heads for a fair coin
  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

interface Calculation {
  coins: number;
  heads: number;
  probability: number;
}

export default function Page() {
  const [coins, setCoins] = useState('')
  const [heads, setHeads] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [calculations, setCalculations] = useState<Calculation[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const coinsNum = parseInt(coins, 10)
    const headsNum = parseInt(heads, 10)
    
    if (isNaN(coinsNum) || isNaN(headsNum) || coinsNum < 1 || headsNum > coinsNum) {
      alert('Invalid input. Please check your numbers.')
      return
    }

    const probability = calculateProbability(coinsNum, headsNum)
    const percentageProbability = probability * 100

    const newCalculation: Calculation = {
      coins: coinsNum,
      heads: headsNum,
      probability: percentageProbability
    }

    setCalculations(prevCalculations => [newCalculation, ...prevCalculations])
    setIsOpen(false)
    setCoins('')
    setHeads('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Coin Flip Probability Calculator</h1>
      </header>
      <div className="max-w-4xl mx-auto">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">Open Coin Flip Counter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Coin Flip Probability Calculator</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="coins">Total Coin Flips (n)</Label>
                <Input
                  id="coins"
                  type="number"
                  placeholder="Enter number of coin flips"
                  value={coins}
                  onChange={(e) => setCoins(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heads">Desired Number of Heads (k)</Label>
                <Input
                  id="heads"
                  type="number"
                  placeholder="Enter desired number of heads"
                  value={heads}
                  onChange={(e) => setHeads(e.target.value)}
                  required
                  min="0"
                />
              </div>
              <Button type="submit" className="w-full">
                Calculate Probability
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        
        {calculations.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {calculations.map((calc, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Calculation {calculations.length - index}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Coin Flips (n): {calc.coins}</p>
                  <p>Heads (k): {calc.heads}</p>
                  <p>Probability: {calc.probability.toFixed(6)}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

