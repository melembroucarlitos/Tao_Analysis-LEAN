namespace hidden

-- myNatural Numbers
-- 2.1.1
inductive myNat : Type
  | zero : myNat
  | succ : myNat → myNat

-- Can these be proven?? Or must they be axioms??

-- Axiom 2.1 (0 is a myNatural number)
-- Axiom 2.2 (If n is a myNatural number, n++ is also a myNatural number)
-- Axiom 2.3 (For all n, n++ != 0)
-- Axiom 2.4 (n != m -> n++ != m++)
-- Axiom 2.5 (Mathematical Induction)

-- 2.2.1
def add (m n : myNat) : myNat :=
  myNat.rec_on m n (λ a add_m_n, myNat.succ add_m_n)

-- 2.2.7
def positive (n : myNat) : Prop :=
  ¬(n = myNat.zero)
  -- Untested

-- 2.2.11 Orderin (Untested)
def lt (m n: myNat) : Prop :=
  ∃ r: myNat, n = add m r

def leq (m n: myNat) : Prop :=
  (lt m n) ∨ (m = n)

def gt (m n: myNat) : Prop :=
  ∃ r: myNat, m = add n r

def geq (m n: myNat) : Prop := 
  (gt m n) ∨ (m = n)

-- 2.3.1
def multiply (m n : myNat) : myNat :=
  myNat.rec_on m myNat.zero (λ a mult_m_n, add n mult_m_n)

-- 2.3.11
def exponantiate (m n : myNat) : myNat :=
  myNat.rec_on n (myNat.succ myNat.zero) (λ a exp_m_n, multiply exp_m_n m)


--TPIL

-- theorem add_zero
-- theorem add_succ

theorem zero_add (n : myNat) : add myNat.zero n = n :=
  myNat.rec_on n
    (show add myNat.zero myNat.zero = myNat.zero, from rfl)
    (assume n,
      assume ih: add myNat.zero n = n,
      show add myNat.zero (myNat.succ n)= (myNat.succ n), from
        calc
          add myNat.zero (myNat.succ n) = myNat.succ (add myNat.zero n) : rfl
          ...                           = myNat.succ n                  : by rw ih
    )

-- Two ways of Having this be one liners...

-- add_assoc
-- Add-assoc one liner
-- Add_comm
-- Succ_add


#check myNat.zero
  

--TPIL


-- Set Theory! (Review how to formalize sets and what not)

end hidden
