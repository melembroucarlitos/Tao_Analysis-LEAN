-- Level name : The Peano axioms

/-
Definition 2.1.1 (Informal)
ℕ := {0, 1, 2, 3, 4, ...} 
-/
constant myNat: Type

/-Axiom: 2.1
0 is a natural number
-/
axiom zero : myNat

/-Axiom: 2.2
If n is a natural number, then n++ is also a natural number
-/
axiom succ : myNat → myNat

-- Definition 2.1.3
-- Proposition 2.1.4
-- Example 2.1.5

/-Axiom: 2.3
0 is not the s
-/
axiom zero_not_succ : ∀ (n : myNat), succ n ≠ zero 

/-Proposition 2.1.6
4 ≢ 0
-/
noncomputable def three : myNat := succ (succ (succ zero))
noncomputable def four : myNat := succ(three)

theorem four_neq_zero : four ≠ zero := 
  begin
    unfold four,
    exact zero_not_succ three,
  end

-- Example 2.1.7

/-Axiom 2.4
Different natural numbers have different successors
-/
axiom succ_injective : ∀ (n m : myNat), succ n = succ m → n = m

-- Proposition 2.1.8.
-- Example 2.1.9 (Informal)

/-Axiom 2.5
Principle of mathematical induction
-/
axiom induction : ∀ (p : myNat → Prop), (p zero ∧ (∀ (n: myNat), p n → p (succ n))) → (∀ (n : myNat), p n)  

--Remark 2.1.10
--Proposition 2.1.11
--Assumption 2.6
--Remark 2.1.12
--Remark 2.1.13 (Informal)
--Remark 2.1.14
--Remark 2.1.15
--Proposition 2.1.16